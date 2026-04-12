import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker using Vite's URL resolution natively
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ExtractedLinks {
  linkedin: string;
  github: string;
  kaggle: string;
  leetcode: string;
  hackerrank: string;
  stackoverflow: string;
  behance: string;
  personalWebsite: string;
  other: string[];
}

const URL_PATTERNS: Record<string, RegExp> = {
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+\/?/gi,
  github: /(?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+\/?/gi,
  kaggle: /(?:https?:\/\/)?(?:www\.)?kaggle\.com\/[\w-]+\/?/gi,
  leetcode: /(?:https?:\/\/)?(?:www\.)?leetcode\.com\/(?:u\/)?[\w-]+\/?/gi,
  hackerrank: /(?:https?:\/\/)?(?:www\.)?hackerrank\.com\/(?:profile\/)?[\w-]+\/?/gi,
  stackoverflow: /(?:https?:\/\/)?(?:www\.)?stackoverflow\.com\/users\/[\w-/]+\/?/gi,
  behance: /(?:https?:\/\/)?(?:www\.)?behance\.net\/[\w-]+\/?/gi,
};

/**
 * Extracts text content from a PDF file
 */
async function extractTextFromPDF(file: File): Promise<{text: string, annotationUrls: string[]}> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const textParts: string[] = [];
  const annotationUrls: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    
    // Extract text
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' '); // We join with spaces for readability, but will also strip spaces later for URL finding
    textParts.push(pageText);

    // Extract clickable hyperlinks (annotations)
    const annotations = await page.getAnnotations();
    for (const anno of annotations) {
      if (anno.subtype === 'Link' && anno.url) {
        annotationUrls.push(anno.url);
      }
    }
  }

  return { text: textParts.join('\n'), annotationUrls };
}

/**
 * Parses a resume PDF and extracts professional platform links
 */
export async function parseResumeForLinks(file: File): Promise<ExtractedLinks> {
  const { text, annotationUrls } = await extractTextFromPDF(file);
  
  const result: ExtractedLinks = {
    linkedin: '',
    github: '',
    kaggle: '',
    leetcode: '',
    hackerrank: '',
    stackoverflow: '',
    behance: '',
    personalWebsite: '',
    other: [],
  };

  // We'll search both the raw text (with spaces removed aggressively to catch broken links)
  // AND the actual clickable links embedded in the PDF
  const textNoSpaces = text.replace(/\s+/g, '');
  const searchSources = [text, textNoSpaces, ...annotationUrls];

  // Match known platform URLs
  for (const source of searchSources) {
    if (!source) continue;
    
    for (const [platform, pattern] of Object.entries(URL_PATTERNS)) {
      pattern.lastIndex = 0; // Reset regex state
      const matches = source.match(pattern);
      if (matches && matches.length > 0) {
        let matchedUrl = matches[0].trim();
        if (!matchedUrl.startsWith('http')) {
          matchedUrl = 'https://' + matchedUrl;
        }
        // Save it if we haven't found a link for this platform yet
        const currentVal = result[platform as keyof Omit<ExtractedLinks, 'other' | 'personalWebsite'>];
        if (!currentVal) {
          result[platform as keyof Omit<ExtractedLinks, 'other' | 'personalWebsite'>] = matchedUrl;
        }
      }
    }
  }

  // Find general generic links for personal website or others
  const generalLinkRegex = /(?:https?:\/\/|www\.)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s,<>"')\]]*)?/gi;
  
  // Combine all found URLs from text and annotations
  const allRawUrls = [
    ...(text.match(generalLinkRegex) || []),
    ...(textNoSpaces.match(generalLinkRegex) || []),
    ...annotationUrls
  ];
  
  const allUrls = Array.from(new Set(allRawUrls));
  
  const matchedUrls = new Set(
    Object.values(result).filter((v) => typeof v === 'string' && v !== '')
  );
  
  // Filter out any URLs that essentially match what we already found
  const unmatchedUrls = allUrls.filter(url => {
    return !Array.from(matchedUrls).some(matched => 
      matched.includes(url) || url.includes(matched)
    );
  });

  if (unmatchedUrls.length > 0) {
    let first = unmatchedUrls[0];
    if (!first.startsWith('http')) first = 'https://' + first;
    result.personalWebsite = first;
    
    result.other = unmatchedUrls.slice(1).map(u => u.startsWith('http') ? u : 'https://' + u);
  }

  // Print text and results to console to help with debugging if it still fails
  console.log("Extracted PDF text snippet:", text.substring(0, 200) + '...');
  console.log("Parsed result:", result);

  return result;
}

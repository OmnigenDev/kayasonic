import React from 'react';
import { classNames } from '~/utils/classNames';
import { STARTER_TEMPLATES } from '~/utils/constants'; // Import templates for keyword checking

interface PromptScorerProps {
  inputText: string;
  maxLength?: number; // Max length to consider for 100% score
}

// List of keywords for scoring
const actionKeywords = ['create', 'build', 'make', 'add', 'fix', 'refactor', 'implement', 'generate', 'explain', 'what', 'how', 'why', 'update', 'change', 'remove', 'delete', 'integrate', 'deploy'];
const techKeywords = STARTER_TEMPLATES.flatMap(t => [t.name.toLowerCase(), t.label.toLowerCase(), ...(t.tags || [])]).concat(['react', 'vue', 'angular', 'svelte', 'tailwind', 'css', 'html', 'javascript', 'typescript', 'node.js', 'python', 'docker', 'database', 'api', 'server', 'client', 'mobile', 'web']);
const structureChars = ['`', ':', '{', '[', '<'];
const clarityChars = ['?', '.'];

const isHighlyRepetitive = (text: string, threshold = 0.7, minLength = 10): boolean => {
  if (text.length < minLength) return false;
  const charCounts: { [key: string]: number } = {};
  for (const char of text) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  if (Object.keys(charCounts).length === 0) return true; // Empty or all spaces
  const maxCount = Math.max(...Object.values(charCounts));
  return maxCount / text.length > threshold;
};

const calculatePromptScore = (text: string): number => {
  const lowerText = text.toLowerCase().trim();
  let score = 0;
  const length = lowerText.length;
  const words = lowerText.split(/\s+/).filter(Boolean); // Split into words and remove empty strings
  const wordCount = words.length;
  const uniqueWordCount = new Set(words).size;

  // Initial check for very poor quality
  if (length === 0) return 0;
  if (isHighlyRepetitive(lowerText)) {
    return 0; // IMMEDIATE ZERO SCORE for highly repetitive
  }
  if (wordCount < 2) { // If less than 2 words (e.g. "S", "SS S", or just one long non-word)
      return 0; // IMMEDIATE ZERO SCORE
  }


  // 1. Meaningful Length/Word Count Score (up to 30 points)
  if (wordCount > 1) score += 5;
  if (wordCount > 3 && uniqueWordCount > 2) score += 10; // Min 3 distinct words
  if (wordCount > 7 && uniqueWordCount > 4) score += 10; // Min 7 distinct words
  if (length > 100 && uniqueWordCount > 7) score += 5;  // Bonus for longer, varied prompts

  // 2. Keyword Bonus (up to 40 points)
  let actionKeywordPoints = 0;
  actionKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g'); // Whole word match
    if (regex.test(lowerText)) {
      actionKeywordPoints += 3;
    }
  });
  score += Math.min(actionKeywordPoints, 20); // Cap action keyword points

  let techKeywordPoints = 0;
  const uniqueTechKeywords = new Set(techKeywords.map(k => k.toLowerCase()));
  words.forEach(word => {
    const cleanWord = word.replace(/[.,!?;:]$/, ''); // Remove trailing punctuation
    if (uniqueTechKeywords.has(cleanWord)) {
      techKeywordPoints += 4;
    }
  });
  score += Math.min(techKeywordPoints, 20); // Cap tech keyword points

  // 3. Structure Bonus (up to 15 points)
  let structurePoints = 0;
  structureChars.forEach(char => {
    if (lowerText.includes(char)) {
      structurePoints += 3;
    }
  });
  score += Math.min(structurePoints, 15);

  // 4. Clarity Bonus (up to 15 points)
  let clarityPoints = 0;
  if (clarityChars.some(char => lowerText.endsWith(char))) {
    clarityPoints += 5;
  }
  // Bonus for having multiple sentences (simple check for period not at the end)
  if (wordCount > 5 && lowerText.includes('.') && !lowerText.endsWith('.')) {
    clarityPoints += 5;
  }
  // Bonus for question
  if (lowerText.endsWith('?')) {
      clarityPoints += 5;
  }
  score += Math.min(clarityPoints, 15);

  // Ensure score is between 0 and 100
  return Math.min(100, Math.max(0, Math.round(score)));
};


const PromptScorer: React.FC<PromptScorerProps> = ({ inputText }) => {
  const score = calculatePromptScore(inputText);
  const displayScore = score; // Already rounded in calculation

  return (
    <div className="w-full max-w-chat mx-auto px-3"> {/* Removed margins */}
      <div className="flex justify-between items-center mb-1"> {/* Container for labels */}
        <span className="text-xs font-medium text-bolt-elements-textSecondary">Prompt Score</span>
        <span className="text-xs font-medium text-bolt-elements-textTertiary">{displayScore}/100</span>
      </div>
      <div className="h-2 w-full bg-bolt-elements-background-depth-2 rounded-full overflow-hidden"> {/* Background bar */}
        <div
          className="h-full transition-all duration-300 ease-out" // Removed background color class
          style={{
            width: `${score}%`,
            backgroundImage: 'linear-gradient(to right, #FC56EC 23.46%, #980DE0 100%)', // Added gradient
          }}
        />
      </div>
    </div>
  );
};

export default PromptScorer;

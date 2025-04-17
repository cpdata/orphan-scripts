// Lazy Token Counter

// This script is an effecient 'close enough' token counter. 
// Meant to be used as a fast and reliable alternative way to count tokens other than OpenAI's 'tiktoken' library.
// The 'tiktoken' library uses various different token counting algorithms for different models.
// The downside to tiktoken is that it introduces further dependencies for a project, if not updated it will fail with newer models. 
// It is slow in situtations that require non-stop token counting. The script provides a way to get token count 'estimates'.
// Compare output to the output on OpenAI's officail token counter website: https://platform.openai.com/tokenizer
// For example for a string of text that this script encodeStringToTokens() calculates 516 tokens compared to GPT-4o: 506, GPT-4: 509, GPT-3.5/legacy: 537
// It's less than the legacy version of tiktoken and only roughly about ~0.02% more than the modern tiktoken codecs.
// Additionally tiktoken isn't always goint to produce the actual cost as there are unspecified formatting tokens that the LLM providers use and update so it becomes difficult to be sure that any token count is exact.
// Avoid the pains, the overhead, and tiktoken and just use this 'LazyTokenCount'

// Author: Charles P. Cross - @cpdata on GitHub
// No Warranty - Code is provided as is
// License: MIT

function encodeStringToTokens(stringToEncode) {
    // Split the string into tokens based on spaces, punctuation, new lines, and ensure new lines are preserved as tokens
    const rawTokens = stringToEncode.split(/(\s+|\n|\.|,|!|\?)/).filter(token => token.length > 0);

    // Initialize an array to hold the final tokens.
    const tokens = [];

    rawTokens.forEach(token => {
        // Check if the token is a new line
        if (token === '\n') {
            tokens.push(token); // Add the new line as a separate token
        } else if (token.trim().length > 7) { // Check if token (excluding spaces) is longer than 7 characters
            // Split long words into segments of 7 characters
            let start = 0;
            while (start < token.length) {
                tokens.push(token.substr(start, 7)); // Extract segments of 7 characters
                start += 7;
            }
        } else if (token.trim().length) { // Ensure token is not just whitespace
            tokens.push(token); // Add tokens that are 7 characters or under directly
        }
    });

    return tokens;
}

function countStringTokens(stringToCount) {
    const tokens = encodeStringToTokens(stringToCount);
    return tokens.length;
}

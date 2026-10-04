
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");

const analyzeBtn = document.getElementById("analyzeBtn");
const exampleBtn = document.getElementById("exampleBtn");
const clearBtn = document.getElementById("clearBtn");

const errorMessage = document.getElementById("errorMessage");

const complexityScore = document.getElementById("complexityScore");
const complexityLabel = document.getElementById("complexityLabel");
const complexityDescription = document.getElementById("complexityDescription");

const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const avgWordLength = document.getElementById("avgWordLength");
const avgSentenceLength = document.getElementById("avgSentenceLength");

const vocabularyBar = document.getElementById("vocabularyBar");
const sentenceBar = document.getElementById("sentenceBar");
const difficultyBar = document.getElementById("difficultyBar");

const vocabularyLevel = document.getElementById("vocabularyLevel");
const sentenceLevel = document.getElementById("sentenceLevel");
const difficultyLevel = document.getElementById("difficultyLevel");

const readingTime = document.getElementById("readingTime");
const longestSentence = document.getElementById("longestSentence");
const uniqueWords = document.getElementById("uniqueWords");
const vocabularyRatio = document.getElementById("vocabularyRatio");

const adviceTitle = document.getElementById("adviceTitle");
const adviceText = document.getElementById("adviceText");


// CHARACTER COUNTER

textInput.addEventListener("input", () => {

    const count = textInput.value.length;

    charCount.textContent =
        `${count.toLocaleString()} character${count === 1 ? "" : "s"}`;
});


// CLEAN TEXT

function cleanWord(word) {

    return word
        .toLowerCase()
        .replace(/[^a-z']/g, "");
}


// ANALYZE

function analyzeText() {

    const text = textInput.value.trim();

    errorMessage.textContent = "";

    if (!text) {
        errorMessage.textContent = "Please enter some text first.";
        return;
    }

    // WORDS

    const rawWords = text.match(/\b[\w'-]+\b/g) || [];

    const words = rawWords
        .map(cleanWord)
        .filter(word => word.length > 0);

    const totalWords = words.length;


    // SENTENCES

    const sentences = text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);

    const totalSentences = sentences.length;


    // BASIC METRICS

    const totalLetters = words.reduce(
        (sum, word) => sum + word.length,
        0
    );

    const averageWordLength =
        totalWords > 0
            ? totalLetters / totalWords
            : 0;

    const averageSentenceLength =
        totalSentences > 0
            ? totalWords / totalSentences
            : 0;


    // UNIQUE WORDS

    const uniqueSet = new Set(words);

    const uniqueCount = uniqueSet.size;

    const vocabularyRatioValue =
        totalWords > 0
            ? (uniqueCount / totalWords) * 100
            : 0;


    // LONGEST SENTENCE

    let longest = 0;

    sentences.forEach(sentence => {

        const count =
            sentence.match(/\b[\w'-]+\b/g)?.length || 0;

        if (count > longest) {
            longest = count;
        }
    });


    // VOCABULARY COMPLEXITY

    const longWords =
        words.filter(word => word.length >= 7).length;

    const longWordRatio =
        totalWords > 0
            ? longWords / totalWords
            : 0;


    // SENTENCE COMPLEXITY

    let sentenceComplexity =
        Math.min(averageSentenceLength / 30, 1) * 100;

    sentenceComplexity =
        Math.round(sentenceComplexity);


    // VOCABULARY SCORE

    let vocabularyScore =
        Math.min(
            ((averageWordLength - 3) / 5) * 100 +
            (longWordRatio * 40),
            100
        );

    vocabularyScore =
        Math.max(0, Math.round(vocabularyScore));


    // OVERALL COMPLEXITY

    let score =
        (vocabularyScore * 0.45) +
        (sentenceComplexity * 0.55);

    score = Math.round(Math.min(100, Math.max(0, score)));


    // CLASSIFICATION

    let label;
    let description;

    if (score < 30) {

        label = "Easy";
        description =
            "This text uses relatively simple vocabulary and sentence structures.";

    } else if (score < 55) {

        label = "Moderate";
        description =
            "This text has a balanced level of vocabulary and sentence complexity.";

    } else if (score < 75) {

        label = "Advanced";
        description =
            "This text contains longer sentences and more demanding vocabulary.";

    } else {

        label = "Highly Complex";
        description =
            "This text contains dense vocabulary and complex sentence structures.";
    }


    // VOCABULARY LEVEL

    let vocabLabel;

    if (vocabularyScore < 30) {
        vocabLabel = "Simple";
    } else if (vocabularyScore < 60) {
        vocabLabel = "Moderate";
    } else {
        vocabLabel = "Advanced";
    }


    // SENTENCE LEVEL

    let sentenceLabel;

    if (sentenceComplexity < 30) {
        sentenceLabel = "Simple";
    } else if (sentenceComplexity < 60) {
        sentenceLabel = "Moderate";
    } else {
        sentenceLabel = "Complex";
    }


    // READING TIME

    const minutes =
        Math.max(1, Math.ceil(totalWords / 200));


    // UPDATE UI

    wordCount.textContent =
        totalWords.toLocaleString();

    sentenceCount.textContent =
        totalSentences;

    avgWordLength.textContent =
        averageWordLength.toFixed(1);

    avgSentenceLength.textContent =
        averageSentenceLength.toFixed(1);

    uniqueWords.textContent =
        uniqueCount.toLocaleString();

    vocabularyRatio.textContent =
        vocabularyRatioValue.toFixed(1) + "%";

    longestSentence.textContent =
        longest + " words";

    readingTime.textContent =
        minutes + (minutes === 1 ? " min" : " mins");


    complexityScore.textContent =
        score;

    complexityLabel.textContent =
        label;

    complexityDescription.textContent =
        description;


    // PROGRESS BARS

    vocabularyBar.style.width =
        vocabularyScore + "%";

    sentenceBar.style.width =
        sentenceComplexity + "%";

    difficultyBar.style.width =
        score + "%";


    vocabularyLevel.textContent =
        vocabLabel;

    sentenceLevel.textContent =
        sentenceLabel;

    difficultyLevel.textContent =
        label;


    // SCORE CIRCLE

    const degrees = score * 3.6;

    document.querySelector(".score-circle").style.background =
        `conic-gradient(
            var(--accent) ${degrees}deg,
            #e8e3d9 ${degrees}deg
        )`;


    // ADVICE

    if (score < 30) {

        adviceTitle.textContent =
            "Your text is easy to read.";

        adviceText.textContent =
            "The passage uses accessible vocabulary and relatively short sentence structures. It may work well for general audiences and beginner readers.";

    } else if (score < 55) {

        adviceTitle.textContent =
            "Your text has a balanced reading level.";

        adviceText.textContent =
            "The vocabulary and sentence structure show moderate complexity. This level is suitable for many educational and general-purpose texts.";

    } else if (score < 75) {

        adviceTitle.textContent =
            "Your text requires focused reading.";

        adviceText.textContent =
            "Consider shortening very long sentences or replacing difficult words if your target audience needs simpler language.";

    } else {

        adviceTitle.textContent =
            "Your text is highly demanding.";

        adviceText.textContent =
            "The passage contains dense linguistic patterns. Breaking long sentences into smaller sections may improve readability.";
    }
}


// EXAMPLE

exampleBtn.addEventListener("click", () => {

    textInput.value =
        `Artificial intelligence is transforming the way people interact with technology. Modern systems can process large amounts of information, identify patterns, and generate useful responses within seconds. However, understanding these systems requires knowledge of algorithms, data processing, computational models, and the limitations associated with automated decision-making.`;

    charCount.textContent =
        `${textInput.value.length.toLocaleString()} characters`;

    analyzeText();
});


// CLEAR

clearBtn.addEventListener("click", () => {

    textInput.value = "";

    charCount.textContent =
        "0 characters";

    errorMessage.textContent = "";

    complexityScore.textContent = "0";

    complexityLabel.textContent =
        "Waiting for text";

    complexityDescription.textContent =
        "Enter some text to calculate its complexity.";

    wordCount.textContent = "0";
    sentenceCount.textContent = "0";
    avgWordLength.textContent = "0";
    avgSentenceLength.textContent = "0";

    uniqueWords.textContent = "0";
    vocabularyRatio.textContent = "0%";
    longestSentence.textContent = "0 words";
    readingTime.textContent = "0 min";

    vocabularyBar.style.width = "0%";
    sentenceBar.style.width = "0%";
    difficultyBar.style.width = "0%";

    vocabularyLevel.textContent = "—";
    sentenceLevel.textContent = "—";
    difficultyLevel.textContent = "—";

    adviceTitle.textContent =
        "Your analysis will appear here.";

    adviceText.textContent =
        "TextLens examines several linguistic characteristics to estimate how easy or difficult a passage is to read.";

    document.querySelector(".score-circle").style.background =
        `conic-gradient(
            var(--accent) 0deg,
            var(--accent) 0deg,
            #e8e3d9 0deg
        )`;
});


// ANALYZE BUTTON

analyzeBtn.addEventListener("click", analyzeText);

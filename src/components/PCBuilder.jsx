import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Slider from 'react-slick';
import Question from './Question';
import UserInput from './UserInput';
import AIResponse from './AIResponse';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PCBuilder = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showParagraph, setShowParagraph] = useState(false); 

  // const sliderRef = useRef(null);

  const questions = [
    {
      id: 'use',
      text: 'What are the primary uses for your computer?',
      options: ['Gaming', 'Office Work', 'Graphic Design', 'Video Editing', 'SW Development'],
    },
    {
      id: 'performance',
      text: 'Are there any specific specifications you are looking for?',
      options: ['High performance', 'Mid performance', 'Low performance'],
    },
    {
      id: 'budget',
      text: 'What is your budget for this computer?',
      options: ['Under $500', '$500 to $1000', '$1000 to $1500'],
    },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    if (step < questions.length - 1) {
      setStep((prevStep) => prevStep + 1); 
    } else {
   
      console.log('All questions answered, moving to AI response');
      setStep(questions.length);
    }

  };

  useEffect(() => {
    if (step === questions.length) {
      console.log('All questions answered, showing paragraph');
      setShowParagraph(true);
    }
  }, [step, questions.length]);

  const handleSubmit = async (query) => {
    setIsLoading(true);
    setUserQuery(query);
    setError('');
    setAiResponse('');

    const API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
    console.log('API Key:', API_KEY);

    if (!API_KEY) {
      setError('API key is missing. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const prompt = `You are an AI assistant specializing in PC building. Based on the following user preferences and query, provide a detailed recommendation for a PC build. Format your response in markdown, using headers, lists, and emphasis where appropriate.

      User Preferences:
      - Primary use: ${answers.use}
      - Performance level: ${answers.performance}
      - Budget: ${answers.budget}

      User query: ${query}

      Please provide:
      1. A summary of recommended components
      2. Explanation of why these components are suitable
      3. Any additional advice or alternatives if relevant
      4. Estimated total cost`;

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), 30000)
      );

      const responsePromise = model.generateContent(prompt);
      const result = await Promise.race([responsePromise, timeoutPromise]);

      if (result.response) {
        const text = await result.response.text();
        if (text && text.trim() !== '') {
          setAiResponse(text);
          console.log("AI response received successfully");
        } else {
          throw new Error('Empty response from AI');
        }
      } else {
        throw new Error('Invalid response structure from AI');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setError(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col min-h-full justify-between max-w-7xl mx-auto mt-8 p-4 text-center">
      <div className="flex-grow ">
        <div className="container mx-auto text-center mt-2 pb-5">
          <h1 className="text-white text-2xl font-semibold">Welcome! I'm your virtual PC builder.</h1>
          <h1 className="text-white text-2xl font-semibold">Let's create your perfect setup together!</h1>
        </div>
        <span className="text-gray-500  text-sm">Let me ask you several questions to understand your needs.</span>
        {step < questions.length ? (
          <Question question={questions[step]} onAnswer={handleAnswer} />
        ) : (
          <>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {aiResponse && <AIResponse response={aiResponse} query={userQuery} />}
          </>
        )}
      </div>
  

      <UserInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isDisabled={step < questions.length}
        showParagraph={showParagraph}
        setShowParagraph={setShowParagraph}
      />

    </div>
  );
};

export default PCBuilder;

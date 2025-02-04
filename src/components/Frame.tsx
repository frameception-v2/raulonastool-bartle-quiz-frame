"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { ARCHETYPES, PROJECT_TITLE, QUESTIONS } from "~/lib/constants";

function QuizQuestion({
  question,
  step,
  totalQuestions,
  onAnswer,
}: {
  question: typeof QUESTIONS[number];
  step: number;
  totalQuestions: number;
  onAnswer: (archetype: keyof typeof ARCHETYPES) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Question {step + 1} of {totalQuestions}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{question.text}</h2>
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => onAnswer(option.archetype)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg text-left transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuizResult({ result }: { result: keyof typeof ARCHETYPES }) {
  const archetype = ARCHETYPES[result];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Result:</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-purple-800">{archetype.title} {archetype.emoji}</h2>
          <p className="mt-2 text-purple-700">{archetype.description}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Take Quiz Again
        </button>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<keyof typeof ARCHETYPES, number>>({
    achiever: 0,
    explorer: 0,
    socializer: 0,
    killer: 0,
  });
  const [result, setResult] = useState<keyof typeof ARCHETYPES | null>(null);

  const handleAnswer = (archetype: keyof typeof ARCHETYPES) => {
    const newAnswers = { ...answers, [archetype]: answers[archetype] + 1 };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const maxScore = Math.max(...Object.values(newAnswers));
      const finalResult = (Object.keys(newAnswers) as (keyof typeof ARCHETYPES)[]).find(
        key => newAnswers[key] === maxScore
      )!;
      setResult(finalResult);
    }
  };

  // [Keep existing frame setup and sdk logic...]

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-neutral-900">
          {PROJECT_TITLE}
        </h1>
        
        {result ? (
          <QuizResult result={result} />
        ) : (
          <QuizQuestion
            question={QUESTIONS[currentStep]}
            step={currentStep}
            totalQuestions={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}

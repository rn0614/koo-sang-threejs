// huggingface.jsx
"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Heading, Section, Text, TextField } from "@radix-ui/themes";

const Example = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("en-es"); // Default language pair

  const fetchTranslation = async () => {
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText, lang: language }), // 데이터를 JSON 형식으로 문자열화하여 전달
    });

    const data = await response.json();

    setTranslatedText(data.translation_text);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Heading as="h1">Hugging Face API Test</Heading>
      </div>
      <div className={styles.contentContainer}>
        <Section size="1">
          <div>
            <label>Select Language</label>
            <select onChange={handleLanguageChange} value={language}>
              <option value="en-es">English to Spanish</option>
              <option value="en-de">English to German</option>
              <option value="en-fr">English to French</option>
            </select>
          </div>
          <div>
            <label>Input Text</label>
            <TextField.Root
              size="1"
              onChange={handleInputChange}
              value={inputText}
            />
          </div>
          <Button onClick={fetchTranslation}>Translate</Button>
        </Section>
        <div className={styles.outputContainer}>
          <Text>{translatedText}</Text>
        </div>
      </div>
    </div>
  );
};

export default Example;

"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss"; // Sass 파일 불러오기

export default function ChangeTextPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // 여러 상태를 객체로 관리
  const [transformSettings, setTransformSettings] = useState({
    caseSensitive: true,
    prefix: '',
    suffix: '',
    customRegex: '(TB_[A-Za-z0-9_]+)',
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setInputText(input);

    try {
      const regex = new RegExp(transformSettings.customRegex, transformSettings.caseSensitive ? 'g' : 'gi');
      const transformedText = input.replace(regex, `${transformSettings.prefix}${transformSettings.customRegex}${transformSettings.suffix}`);
      setOutputText(transformedText);
    } catch (error) {
      setOutputText("Invalid regular expression");
    }
  };

  const handleSettingsChange = (key: string, value: string | boolean) => {
    setTransformSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
    handleInputChange({ target: { value: inputText } } as ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className={styles.container}>
      <h1>Clipboard Transformer</h1>
      <div className={styles.label}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={transformSettings.caseSensitive}
          onChange={(e) => handleSettingsChange('caseSensitive', e.target.checked)}
        />
        대소문자 구분
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="앞단어"
          value={transformSettings.prefix}
          onChange={(e) => handleSettingsChange('prefix', e.target.value)}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="뒷단어"
          value={transformSettings.suffix}
          onChange={(e) => handleSettingsChange('suffix', e.target.value)}
        />
      </div>
      <input
        className={styles.inputField}
        type="text"
        placeholder="대상 정규식을 입력하세요"
        value={transformSettings.customRegex}
        onChange={(e) => handleSettingsChange('customRegex', e.target.value)}
      />
      <textarea
        className={styles.textarea}
        value={inputText}
        onChange={handleInputChange}
        placeholder="문자열을 입력하세요"
        rows={10}
      />
      <h2>Transformed Output</h2>
      <textarea
        className={styles.textarea}
        value={outputText}
        readOnly
        rows={10}
      />
    </div>
  );
}

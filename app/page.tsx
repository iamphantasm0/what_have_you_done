"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

interface Accomplishment {
  id: string;
  text: string;
  emoji: string | null;
  createdAt: number;
}

const EMOJI_OPTIONS = ["🎉", "🔥", "💪", "✨", "🚀", "⭐", "💯", "🎯", "🌟", "👏"];

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [inputText, setInputText] = useState("");
  const [showAdvice, setShowAdvice] = useState(false);

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Load accomplishments from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("accomplishments");
    if (saved) {
      try {
        setAccomplishments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load accomplishments:", e);
      }
    }
  }, []);

  // Save accomplishments to localStorage whenever they change
  useEffect(() => {
    if (accomplishments.length > 0) {
      localStorage.setItem("accomplishments", JSON.stringify(accomplishments));
    }
  }, [accomplishments]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newAccomplishment: Accomplishment = {
      id: Date.now().toString(),
      text: inputText.trim(),
      emoji: null,
      createdAt: Date.now(),
    };

    setAccomplishments([newAccomplishment, ...accomplishments]);
    setInputText("");
  };

  const handleEmojiClick = (id: string, emoji: string) => {
    setAccomplishments(
      accomplishments.map((acc) =>
        acc.id === id ? { ...acc, emoji: acc.emoji === emoji ? null : emoji } : acc
      )
    );
  };

  const handleDelete = (id: string) => {
    setAccomplishments(accomplishments.filter((acc) => acc.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all accomplishments?")) {
      setAccomplishments([]);
      localStorage.removeItem("accomplishments");
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>What Have You Done?</h1>
        <p className={styles.subtitle}>
          Track your wins, big and small {context?.user?.displayName ? `@${context.user.displayName}` : ""}
        </p>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleAdd} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="What did you accomplish today?"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={styles.input}
              maxLength={200}
            />
            <button type="submit" className={styles.addButton} disabled={!inputText.trim()}>
              Add
            </button>
          </div>
        </form>

        {accomplishments.length > 0 && (
          <div className={styles.stats}>
            <span className={styles.statItem}>
              {accomplishments.length} {accomplishments.length === 1 ? "win" : "wins"}
            </span>
            <span className={styles.statItem}>
              {accomplishments.filter((acc) => acc.emoji).length} with reactions
            </span>
            <button onClick={handleClearAll} className={styles.clearButton}>
              Clear All
            </button>
          </div>
        )}

        <div className={styles.list}>
          {accomplishments.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyEmoji}>📝</div>
              <p className={styles.emptyText}>No accomplishments yet</p>
              <p className={styles.emptySubtext}>Start adding your wins above!</p>
            </div>
          ) : (
            accomplishments.map((acc) => (
              <div key={acc.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <div className={styles.itemText}>{acc.text}</div>
                  <div className={styles.itemMeta}>
                    <span className={styles.date}>{formatDate(acc.createdAt)}</span>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className={styles.deleteButton}
                      aria-label="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className={styles.emojiSection}>
                  <div className={styles.emojiGrid}>
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiClick(acc.id, emoji)}
                        className={`${styles.emojiButton} ${
                          acc.emoji === emoji ? styles.emojiButtonActive : ""
                        }`}
                        aria-label={`React with ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {acc.emoji && (
                    <div className={styles.selectedEmoji}>
                      Your reaction: <span className={styles.emojiDisplay}>{acc.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.adviceSection}>
          <button
            onClick={() => setShowAdvice(!showAdvice)}
            className={styles.adviceToggle}
          >
            {showAdvice ? "Hide" : "Show"} Tips & Adjustments
          </button>
          {showAdvice && (
            <div className={styles.adviceContent}>
              <h3 className={styles.adviceTitle}>💡 Ideas for Improvement</h3>
              <ul className={styles.adviceList}>
                <li>
                  <strong>Categories:</strong> Add tags or categories (work, personal, health, etc.)
                </li>
                <li>
                  <strong>Streaks:</strong> Track daily streaks to build consistency
                </li>
                <li>
                  <strong>Goals:</strong> Set weekly/monthly goals and track progress
                </li>
                <li>
                  <strong>Sharing:</strong> Share accomplishments on Farcaster or export as image
                </li>
                <li>
                  <strong>Analytics:</strong> Visualize your progress with charts and insights
                </li>
                <li>
                  <strong>Reminders:</strong> Daily prompts to log your accomplishments
                </li>
                <li>
                  <strong>Search:</strong> Search and filter through past accomplishments
                </li>
                <li>
                  <strong>Backup:</strong> Cloud sync to never lose your data
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const { Plugin } = require("obsidian");

class TranslatePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "translate-selected-text",
      name: "Translate Selected Text",
      editorCallback: async (editor, view) => {
        const selectedText = editor.getSelection();
        if (!selectedText) {
          new Notice("No text selected.");
          return;
        }

        const translatedText = await this.translateText(selectedText);
        const cursor = editor.getCursor("to");
        editor.replaceRange(`\n\n> ${translatedText}`, cursor);
      },
    });
  }

  async translateText(text) {
    const response = await fetch("https://api.example.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const result = await response.json();
    return result.translatedText;
  }
}

module.exports = TranslatePlugin;

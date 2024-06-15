const { Plugin } = require("obsidian");

class TranslatePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "translate-selection-zh",
      name: "Translate Selection ZH",
      editorCallback: async (editor, view) => {
        const selectedText = editor.getSelection();
        if (!selectedText) {
          new Notice("No text selected.");
          return;
        }

        console.log("zhx100: " + selectedText);
        const translatedText = await this.translateText(selectedText, 'zh', 'en');
        const cursor = editor.getCursor("to");
        console.log("zhx101: " + translatedText);
        editor.replaceRange(`\n\n${translatedText}`, cursor);
      },
    });
    this.addCommand({
      id: "translate-selection-en",
      name: "Translate Selection EN",
      editorCallback: async (editor, view) => {
        const selectedText = editor.getSelection();
        if (!selectedText) {
          new Notice("No text selected.");
          return;
        }

        console.log("zhx100: " + selectedText);
        const translatedText = await this.translateText(selectedText,  'en', 'zh');
        const cursor = editor.getCursor("to");
        console.log("zhx101: " + translatedText);
        editor.replaceRange(`\n\n${translatedText}`, cursor);
      },
    });
  }

  async translateText(text, from, to) {
    const response = await fetch("http://localhost:5000/translatesection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedText: text, from: from, to: to }),
    });

    const result = await response.json();
    return result.result;
  }
}

module.exports = TranslatePlugin;

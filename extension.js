// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require("child_process");


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {
	let disposable = vscode.commands.registerCommand(
	  'formatandgo.formatGoCode',
	  formatGoCode
	);
	context.subscriptions.push(disposable);
  }
  
  
  
  //the main code.........
  function formatGoCode() {
	  // Get the active text editor
	  const editor = vscode.window.activeTextEditor;
	  
	  if (editor) {
		  // Get the selected text
		  const selectedText = editor.document.getText(editor.selection);
		  
		  // Execute gofmt to format the code
		  exec(`sudo go fmt "${selectedText}"`, (error, stdout, stderr) => {
		  vscode.window.showInformationMessage(' Formatted and went successfully');
		if (error) {
		  console.error(`Error: ${error.message}`);
		  return;
		}
		if (stderr) {
		  console.error(`Stderr: ${stderr}`);
		  return;
		}
  
		// Replace the selected text with the formatted code
		editor.edit((editBuilder) => {
		  editBuilder.replace(editor.selection, stdout);
		});
	  });
	}
  }
  


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

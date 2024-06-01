'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // toggle state状态切换
    const toggleState = vscode.commands.registerCommand('texteditor-util.toggleState', async function () {
		const folderMaps = vscode.workspace.workspaceFolders?.map(folder => {
			const name = folder.uri.path.match(/\/?([a-zA-Z0-9_]+)$/)?.[1] || '';
			return {
				label: name,
				path: folder?.uri?.path || ''
			};
			// console.log(folder.uri.path);
			// let uri = Uri.file('/some/path/to/folder');
			// let success = await commands.executeCommand('vscode.openFolder', uri);
		}) || [];
		// const folderNames = folderMaps?.map(item => item.name) || [];
		vscode.window
                    .showQuickPick(folderMaps, {
                        placeHolder: '切换空间',
                        matchOnDescription: true
                    })
                    .then(item => {
                        const uri = vscode.Uri.file(item!.path);
						vscode.commands.executeCommand('vscode.openFolder', uri);
                    });
		// vscode.workspace.workspaceFolders?.forEach(folder => {
		// 	console.log(folder.uri.path);
		// 	// let uri = Uri.file('/some/path/to/folder');
		// 	// let success = await commands.executeCommand('vscode.openFolder', uri);
		// });
        // Get the active text editor
        // const editor = vscode.window.activeTextEditor;

        // if (editor) {
        //     const document = editor.document;
        //     const selection = editor.selection;

        //     // Get the word within the selection
        //     const word = document.getText(selection);
        //     const reverseState = util.toggleState(word);

        //     await vscode.env.clipboard.writeText(reverseState);
        //     // await vscode.commands.executeCommand("actions.find");
        //     // await vscode.commands.executeCommand("editor.action.selectAll");
        //     // await vscode.commands.executeCommand("execPaste");
        // }
    });

    context.subscriptions.push(toggleState);
}

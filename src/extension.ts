import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const projectStructure = [
  'cmd/main.go',
  'api/.gitkeep',
  'middleware/log/logger.go',
  'controller/.gitkeep',
  'service/.gitkeep',
  'dao/mysql/mysql.go',
  'dao/redis/redis.go',
  'model/common/.gitkeep',
  'model/db/entity.go',
  'model/db/init.go',
  'model/param/.gitkeep',
  'model/response/code.go',
  'model/response/response.go',
  'pkg/.gitkeep',
  'etc/conf/.gitkeep',
  'etc/setting/setting.go',
  'test/.gitkeep',
  '.gitignore',
  '.air.toml',
];

function createProjectStructure(basePath: string) {
  projectStructure.forEach(filePath => {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (filePath.endsWith('.go') || filePath.endsWith('.gitkeep') || path.basename(filePath).startsWith('.')) {
      fs.writeFileSync(fullPath, '');
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.init', async () => {
    const folderUri = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      openLabel: 'Select Project Folder'
    });

    if (folderUri && folderUri[0]) {
      createProjectStructure(folderUri[0].fsPath);
      vscode.window.showInformationMessage('Go Web Project Structure Created!');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

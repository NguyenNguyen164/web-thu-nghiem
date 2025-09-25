const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Backup directory
const backupDir = path.join(process.env.HOME, 'nguyen-furniture-backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Files and directories to clean up
const filesToBackup = [
  'public/Nguyen-wood.json',
  'scripts/parse_product.py',
  'scripts/README.md'
];

// Backup files
console.log('Backing up files...');
filesToBackup.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(backupDir, file);
  
  // Create directory structure in backup
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`Backed up: ${file}`);
  }
});

// Clean up files
console.log('\nCleaning up...');
filesToBackup.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed: ${file}`);
  }
});

// Create empty products.json
const emptyData = {
  products: [],
  categories: []
};

fs.writeFileSync(
  path.join(__dirname, 'public/products.json'),
  JSON.stringify(emptyData, null, 2)
);
console.log('\nCreated empty products.json');

// Update productService.ts to use products.json
const productServicePath = path.join(__dirname, 'src/services/productService.ts');
if (fs.existsSync(productServicePath)) {
  let content = fs.readFileSync(productServicePath, 'utf8');
  content = content.replace(
    /fetch\('\/Nguyen-wood.json'\)/g,
    "fetch('/products.json')"
  );
  fs.writeFileSync(productServicePath, content);
  console.log('Updated productService.ts to use products.json');
}

console.log('\nCleanup complete!');
console.log(`Backup files are stored in: ${backupDir}`);

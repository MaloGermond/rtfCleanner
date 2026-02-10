# rtfCleanner - CLI Tool for Displaying Text File Content

A simple command-line tool to display the content of text files.

## Installation

### Prerequisites
- Node.js (v12 or higher recommended)
- npm (comes with Node.js)

### Local Installation

1. Clone this repository or download the source code:

```bash
git clone https://github.com/yourusername/rtfCleanner.git
cd rtfCleanner
```

2. Install dependencies (if any in the future):

```bash
npm install
```

### Global Installation (Optional)

If you want to use the `rtfcleanner` command from anywhere in your system:

```bash
npm link
```

## Usage

### Basic Usage

To display the content of a text file:

```bash
node index.js path/to/your/file.txt
```

Or if you installed it globally:

```bash
rtfcleanner path/to/your/file.txt
```

### Examples

1. Display content of a text file in the current directory:

```bash
node index.js example.txt
```

2. Display content of a file with full path:

```bash
node index.js /path/to/your/document.txt
```

3. Display content of an RTF file (automatically extracts plain text):

```bash
node index.js example.rtf
```

## Features

- Simple and lightweight
- Displays the entire content of text files
- **RTF Support**: Automatically extracts plain text from Rich Text Format (.rtf) files
- Basic error handling for missing files
- Works with both relative and absolute file paths

## Error Handling

The tool includes basic error handling:

- If no file path is provided, it shows usage instructions
- If the file doesn't exist, it displays an error message
- If there's a permission error, it shows the error details

## Development

### Project Structure

- `index.js` - Main CLI script
- `package.json` - Project configuration
- `README.md` - This documentation
- `test.txt` - Sample text file for testing
- `test.rtf` - Sample RTF file for testing
- `experiments/` - Directory for experimental files and tests

### Running Tests

Currently, there are no automated tests, but you can manually test by:

```bash
# Test with text file
node index.js test.txt

# Test with RTF file
node index.js test.rtf
```

### Adding Features

To add new features:

1. Modify `index.js` with your new functionality
2. Update the `package.json` if you add new dependencies
3. Test your changes
4. Update this README if the usage changes

## Contributing

Contributions are welcome! Please feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

[Your Name]

---

*Built with ❤️ using Node.js*
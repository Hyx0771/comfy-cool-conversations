
# Contributing to HVAC Chatbot Widget

Thank you for considering contributing to this project! Here's how you can help.

## 🚀 Getting Started

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/hvac-chatbot-widget.git`
3. Install dependencies: `npm install`
4. Copy environment variables: `cp .env.example .env.local`
5. Start Supabase: `npx supabase start`
6. Start development server: `npm run dev`

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── chatbot/        # Chatbot-specific components
│   └── hvac/           # HVAC service components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Static data and configurations
├── types/              # TypeScript type definitions
└── integrations/       # External service integrations
```

## 🧪 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use semantic HTML elements
- Implement proper error handling
- Add JSDoc comments for complex functions

### Component Guidelines
- Create small, focused components
- Use custom hooks for business logic
- Implement proper loading and error states
- Follow React best practices

### Testing
```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Build check
npm run build
```

## 🔄 Contributing Process

### 1. Create an Issue
Before starting work, create or find an existing issue that describes what you want to build or fix.

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes
- Write clean, readable code
- Follow existing patterns and conventions
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes
- Test manually in development
- Ensure no TypeScript errors
- Verify responsive design
- Test on different browsers

### 5. Commit Your Changes
Use conventional commit messages:
```bash
git commit -m "feat: add new FAQ category system"
git commit -m "fix: resolve mobile layout issue"
git commit -m "docs: update installation instructions"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 📝 Pull Request Guidelines

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] No TypeScript errors
- [ ] Responsive design verified
- [ ] Cross-browser tested

## Screenshots
Include screenshots for UI changes
```

### Review Process
1. Code review by maintainers
2. Automated checks must pass
3. Manual testing if needed
4. Approval and merge

## 🎨 Design System

### Colors
Use semantic tokens from `src/index.css`:
- `--primary` for main actions
- `--secondary` for secondary elements
- `--accent` for highlights
- `--muted` for subtle elements

### Typography
- Use Tailwind typography classes
- Maintain consistent font sizes
- Ensure proper contrast ratios

### Components
- Use shadcn/ui components when possible
- Follow existing design patterns
- Ensure accessibility compliance

## 🔧 Technical Guidelines

### TypeScript
- Use strict mode
- Define proper interfaces
- Avoid `any` type
- Use generics when appropriate

### React
- Use functional components
- Implement proper hooks usage
- Handle side effects correctly
- Optimize re-renders

### Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Use semantic class names
- Maintain consistent spacing

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Browser: [e.g., Chrome 91]
- Device: [e.g., iPhone 12]
- Version: [e.g., 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions you've considered

**Additional context**
Any other context or screenshots
```

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples
- Update README for major changes

### README Updates
- Keep installation instructions current
- Update feature lists
- Include new environment variables
- Add troubleshooting sections

## 🏷️ Versioning

We use [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- Create an issue for technical questions
- Join our Discord community (if available)
- Email maintainers for private concerns

## 🙏 Recognition

Contributors will be added to the README and receive credit for their work.

Thank you for contributing! 🎉

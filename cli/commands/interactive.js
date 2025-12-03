const inquirer = require('inquirer');
const chalk = require('chalk');
const { RESOURCES } = require('../config/resources');
const { add } = require('./add');
const { init } = require('./init');

/**
 * Interactive mode - minimal surface area, focused experience
 */
async function interactive() {
  console.log(chalk.bold.cyan('\n✨ GRG Kit Interactive Mode\n'));

  // Main menu - keep it simple
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '🎨 Initialize with a theme', value: 'init' },
        { name: '➕ Add a resource', value: 'add' },
        { name: '📚 Add examples', value: 'examples' },
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  if (action === 'exit') {
    console.log(chalk.gray('\nGoodbye! 👋\n'));
    return;
  }

  switch (action) {
    case 'init':
      await interactiveInit();
      break;
    case 'add':
      await interactiveAdd();
      break;
    case 'examples':
      await interactiveExamples();
      break;
  }

  // Ask if they want to do more
  const { more } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'more',
      message: 'Would you like to do something else?',
      default: false
    }
  ]);

  if (more) {
    await interactive();
  } else {
    console.log(chalk.gray('\nGoodbye! 👋\n'));
  }
}

/**
 * Interactive init - choose a theme
 */
async function interactiveInit() {
  const themeChoices = RESOURCES.themes.map(theme => ({
    name: `${theme.title} - ${chalk.gray(theme.description)}`,
    value: theme.name,
    short: theme.title
  }));

  const { theme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Choose a theme:',
      choices: themeChoices,
      pageSize: 10
    }
  ]);

  await init({ theme });
}

/**
 * Interactive add - choose category then resource
 */
async function interactiveAdd() {
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'What type of resource?',
      choices: [
        { name: `🎨 Theme (${RESOURCES.themes.length} available)`, value: 'theme' },
        { name: `🧩 Component (${RESOURCES.components.length} available)`, value: 'component' },
        { name: `📐 Layout (${RESOURCES.layouts.length} available)`, value: 'layout' },
        { name: '← Back', value: 'back' }
      ]
    }
  ]);

  if (category === 'back') {
    return;
  }

  let choices = [];
  let resources = [];

  switch (category) {
    case 'theme':
      resources = RESOURCES.themes;
      break;
    case 'component':
      resources = RESOURCES.components;
      break;
    case 'layout':
      resources = RESOURCES.layouts;
      break;
  }

  choices = resources.map(resource => ({
    name: `${resource.title} - ${chalk.gray(resource.description)}`,
    value: resource.name,
    short: resource.title
  }));

  const { resource } = await inquirer.prompt([
    {
      type: 'list',
      name: 'resource',
      message: `Choose a ${category}:`,
      choices: [...choices, { name: '← Back', value: 'back' }],
      pageSize: 10
    }
  ]);

  if (resource === 'back') {
    return interactiveAdd();
  }

  await add(`${category}:${resource}`, {});
}

/**
 * Interactive examples - all or specific
 */
async function interactiveExamples() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Which examples would you like?',
      choices: [
        { 
          name: `📦 All examples (${RESOURCES.examples.components.length}+ components)`, 
          value: 'all' 
        },
        { name: '🔍 Choose specific examples', value: 'specific' },
        { name: '← Back', value: 'back' }
      ]
    }
  ]);

  if (choice === 'back') {
    return;
  }

  if (choice === 'all') {
    await add('examples:all', {});
    return;
  }

  // Specific examples - show popular ones first
  const popularExamples = ['button', 'card', 'dialog', 'form-field', 'input', 'table'];
  const otherExamples = RESOURCES.examples.components
    .filter(ex => !popularExamples.includes(ex.name))
    .map(ex => ex.name);

  const choices = [
    { name: chalk.bold('Popular'), disabled: true },
    ...popularExamples.map(name => {
      const ex = RESOURCES.examples.components.find(e => e.name === name);
      return {
        name: `  ${ex.title} - ${chalk.gray(ex.description)}`,
        value: name,
        short: ex.title
      };
    }),
    { name: chalk.bold('\nOther Components'), disabled: true },
    ...otherExamples.map(name => {
      const ex = RESOURCES.examples.components.find(e => e.name === name);
      return {
        name: `  ${ex.title} - ${chalk.gray(ex.description)}`,
        value: name,
        short: ex.title
      };
    })
  ];

  const { examples } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'examples',
      message: 'Select examples (space to select, enter to confirm):',
      choices,
      pageSize: 15,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one example.';
        }
        return true;
      }
    }
  ]);

  // Add selected examples
  for (const example of examples) {
    await add(`examples:${example}`, {});
  }
}

module.exports = { interactive };

import readline from "readline"
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const Todos = [];

const showMenu = () => {
    console.log(chalk.blueBright("\n==== TODO LIST MENU ===="));
    console.log(chalk.yellow("1: Add a Task"));
    console.log(chalk.yellow("2: View Task List"));
    console.log(chalk.yellow("3: Delete a Task"))
    console.log(chalk.yellow("4: Exit"));
    rl.question(chalk.cyan("Choose an Option: "), handleTodos)
}

const handleTodos = (Option) => {
    if (Option === "1") {
        rl.question(chalk.green("\n Enter your Task: "), (task) => {
            const trimmedTask = task.trim();
            if (trimmedTask === "") {
                console.log(chalk.red("Task cannot be empty!"));
                showMenu();
                return;
            } else {
                Todos.push(trimmedTask);
                console.log(chalk.green("Your task added: "), task)
                showMenu()
            }
        })
    }
    else if (Option === "2") {
        if (Todos.length === 0) {
            console.log(chalk.red("\n Your Todo list is empty!!"))
        } else {
            console.log(chalk.magenta("\n Your Task List: "))
            Todos.forEach((task, index) => {
                console.log(chalk.yellowBright(`${index + 1}: ${task}`))
            });
        }
        showMenu()
    }
    else if (Option === "3") {
        if (Todos.length === 0) {
            console.log(chalk.red("\n Your Todo list is empty, There is nothing to delete!!"))
            showMenu();
        } else {
            console.log("\n Select Task Number to Delete Task: ");
            Todos.forEach((task, index) => {
                console.log(chalk.yellow(`${index + 1}: ${task}`))
            });
            rl.question(chalk.cyan("Enter Task Number: "), (num) => {
                const deleteIndex = parseInt(num.trim(), 10) - 1;
                if (isNaN(deleteIndex) || deleteIndex < 0 || deleteIndex >= Todos.length) {
                    console.log(chalk.red("It's a Wrong Number!!"))
                } else {
                    const deletedItem = Todos.splice(deleteIndex, 1);
                    console.log(chalk.green("Deleted task:"), chalk.strikethrough.red(deletedItem[0]));
                }
                showMenu();
            })
        }
    }
    else if (Option === "4") {
        console.log(chalk.greenBright("Okay Ji"))
        rl.close();
    }
    else {
        console.log(chalk.red("Invalid Option, Please Try again"));
        showMenu();
    }
}

showMenu()
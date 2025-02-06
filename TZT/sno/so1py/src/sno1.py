import os
import aiohttp
import asyncio
from dotenv import load_dotenv
from rich.prompt import Prompt
from rich.console import Console
from rich.panel import Panel
from rich.live import Live
from rich.spinner import Spinner
from datetime import datetime
from src.ut import l_debug, l_info, l_warning, l_error, l_critical

load_dotenv()

modelSelect = [
    "DeepSeek-R1-Distill-Llama-70B",
    "Meta-Llama-3.1-405B-Instruct",
    "Qwen2.5-72B-Instruct",
]
selectedModel = modelSelect[1]

console = Console()


async def co1():
    """Communicate with the LLM API asynchronously, handle errors, and write the response to a file."""

    # Get query with prompt
    myQuery = Prompt.ask(
        "Write your Query", default="Write a haiku about being the hulk"
    )

    # Display the input question and model being used
    console.print(
        Panel(
            f"[bold]Query:[/bold] {myQuery}\n[bold]Model:[/bold] {selectedModel}",
            title="Input Details",
            style="bold cyan",
            border_style="cyan",
        )
    )

    try:
        # Retrieve the API key from environment variables
        api_key = os.environ.get("SAMB1")
        if not api_key:
            raise ValueError("API key not found!")

        # Prepare the headers and payload for the API call
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": selectedModel,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant and rap lyricist.",
                },
                {"role": "user", "content": myQuery},
            ],
            "temperature": 0.1,
            "top_p": 0.1,
        }

        # Create a spinner
        spinner = Spinner("dots", text="Processing...", style="bold green")

        # Create a Live context to update the spinner
        with Live(spinner, console=console, refresh_per_second=10):
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    "https://api.sambanova.ai/v1/chat/completions",
                    headers=headers,
                    json=payload,
                ) as response:
                    response_data = await response.json()
                    response_content = response_data["choices"][0]["message"]["content"]

                    # Log and display the response content in a panel with a box
                    l_info("Response received successfully")
                    console.print(
                        Panel(
                            response_content,
                            title="Response",
                            style="bold green",
                            border_style="blue",
                        )
                    )

                    # Write to file
                    results_dir = "results"
                    os.makedirs(results_dir, exist_ok=True)
                    date_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
                    file_name = f"result_{date_time}.txt"
                    file_path = os.path.join(results_dir, file_name)

                    with open(file_path, "w") as file:
                        file.write(response_content)

                    l_debug(f"Response written to {file_path}")
                    console.print(f"Response written to {file_path}")

    except aiohttp.ClientError as e:
        # Handle aiohttp-specific errors
        l_error(f"An error occurred with the API request: {e}")
        console.print(
            Panel(
                f"An error occurred with the API request: {e}",
                title="Error",
                style="bold red",
                border_style="red",
            )
        )
    except Exception as e:
        # Handle any other exceptions
        l_critical(f"An unexpected error occurred: {e}")
        console.print(
            Panel(
                f"An unexpected error occurred: {e}",
                title="Error",
                style="bold red",
                border_style="red",
            )
        )


async def main():
    # Call the asynchronous co1 function
    await co1()


if __name__ == "__main__":
    # Run the main function using asyncio
    asyncio.run(main())

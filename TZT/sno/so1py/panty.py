# Main Entry Point
from src.ut import header1
from src.sno1 import co1
import asyncio


async def main():
    header1("Communicate with LLM, Write t results")
    await co1()


if __name__ == "__main__":
    asyncio.run(main())

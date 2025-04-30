import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wallets = await fetch("http://localhost:5000/wallets");
    const walletsData = await wallets.json();

    return NextResponse.json(walletsData);
  } catch (error) {
    console.error("Database error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { walletName } = await request.json();

    if (!walletName) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, currentBalance, spentAmount, profitLoss",
        },
        { status: 400 }
      );
    }

    const walletsData = {
      walletName,
      assets: [],
    };

    await fetch("http://localhost:5000/wallets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletsData),
    });

    return NextResponse.json(
      { message: "Wallet added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting wallet: ", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, walletName, assets } = await request.json();

    if (!id || !walletName || !assets) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, currentBalance, spentAmount, profitLoss",
        },
        { status: 400 }
      );
    }

    const walletsData = {
      walletName,
      assets,
    };

    await fetch(`http://localhost:5000/wallets/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletsData),
    });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, currentBalance, spentAmount, profitLoss",
        },
        { status: 400 }
      );
    }

    await fetch(`http://localhost:5000/wallets/${id}`, {
      method: "DELETE",
    });

    return NextResponse.json({ message: "Wallet deleted successfully" });
  } catch (error) {
    console.error("Error deleting wallet: ", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

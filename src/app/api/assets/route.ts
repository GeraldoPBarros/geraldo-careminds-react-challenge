import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { id, walletName, currentAmount, spentAmount, profitLoss, assets } =
      await request.json();

    console.log(id, walletName, currentAmount, spentAmount, profitLoss, assets);

    if (
      !walletName ||
      !currentAmount ||
      !spentAmount ||
      !profitLoss ||
      !assets
    ) {
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
      currentAmount,
      spentAmount,
      profitLoss,
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

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wallets = await fetch("http://localhost:3333/wallets");
    return NextResponse.json(wallets);
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
    const { name, currentBalance, spentAmout, profitLoss } =
      await request.json();

    if (!name || !currentBalance || !spentAmout || !profitLoss) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, currentBalance, spentAmount, profitLoss",
        },
        { status: 400 }
      );
    }

    const walletsData = {
      name,
      currentBalance,
      spentAmout,
      profitLoss,
    };

    await fetch("http://localhost:3333/wallets", {
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name, currentBalance, spentAmout, profitLoss } =
    await request.json();

    if (!name || !currentBalance || !spentAmout || !profitLoss) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, currentBalance, spentAmount, profitLoss",
        },
        { status: 400 }
      );
    }

    // const result = null;

    // if (result.length === 0) {
    //   return NextResponse.json(
    //     { error: "User not found or no changes applied" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await fetch(`http://localhost:3333/wallets?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(
        "deleteSupabaseItem - ResponseOK - data deleted",
        responseData
      );
    } else {
      const responseData = await response.json();
      console.log("deleteSupabaseItem - Response not OK", responseData);
    }
  } catch (error) {
    console.error("Error deleting wallet: ", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

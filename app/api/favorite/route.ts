import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("favorites")
      .eq("id", user?.id)
      .single();

    if (userError) {
      throw userError;
    }

    const currentFavorites = userData.favorites || [];
    const updatedFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((ids: any) => ids !== id)
      : [...currentFavorites, id];

      await supabase
      .from("profiles")
      .update({ favorites: updatedFavorites })
      .eq("id", user?.id);

    const { data: updatedUserData, error: updatedUserError } = await supabase
      .from("profiles")
      .select("favorites")
      .eq("id", user?.id)
      .single();

    if (updatedUserError) {
      throw updatedUserError;
    }

    return NextResponse.json(
      { success: true, data: updatedUserData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
    try {
      const cookieStore = cookies();
      const supabase = await createClient(cookieStore);
  
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("favorites")
        .eq("id", user?.id)
        .single();
  
      if (userError) {
        throw userError;
      }
  
      const favorites = userData.favorites || [];
      
      return NextResponse.json(
        { success: true, favorites },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

import { TimeSchedule } from "@/types/timeSchedule";
import { handleError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { getCurrentTime } from "@/utils/day";
import { NextRequest } from "next/server";

export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("schedule_no_rls")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return handleError("Error fetching data from supabase", 500);
    }
    console.log("schedule data", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleError("Error fetching data from Supabse", 500);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const scheduleList = body.scheduleList as TimeSchedule[];
  const formatedScheduleList = scheduleList.map((scheduleItem) => {
    return {
      id: scheduleItem.id,
      day: scheduleItem.day,
      text: scheduleItem.text,
      startTime: scheduleItem.startTime,
      endTime: scheduleItem.endTime,
      type: scheduleItem.type,
    };
  });
  try {
    const supabase = createClient();
    let { data, error } = await supabase.rpc(
      "upsert_multiple_records_with_transaction",
      {
        schedule_data: formatedScheduleList, // 확인결과 따로 JSON.stringify(updates) 없이 사용
      }
    );
    console.log("data");
    if (error) console.error(error);
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("error occured", error);
  }
}

export async function PUT() {
  const supabase = createClient();
  const updates = [
    // update 되는 복수의 데이터
    { id: 1, changes: { day: "2024-12-28", text: "updated1" } },
    { id: 2, changes: { day: "2024-12-11", text: "updated2" } },
  ];
  try {
    let { data, error } = await supabase.rpc(
      "update_multiple_records_with_transaction",
      {
        updates: updates, // 확인결과 따로 JSON.stringify(updates) 없이 사용
      }
    );
    if (error) console.error(error);
    else console.log(data);

    console.log(error);
    if (error) {
      return handleError(error.message, 300);
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleError("Error fetching data from Supabse", 500);
  }
}

export async function DELETE() {
  const supabase = createClient();
  const id = 2;
  const schedule = {
    day: "2024-12-12",
    text: "updatedText",
    startTime: 12,
    endTime: 14,
    type: "1",
  };
  try {
    console.log("here");
    const { data, error } = await supabase
      .from("schedule_no_rls")
      .update({
        delete_at: getCurrentTime(),
      })
      .eq("id", id)
      .select(); // 해당결과값 재반환
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleError("Error fetching data from Supabse", 500);
  }
}

import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`iPone ${params.id}`);
    }, 100);
  });
  return {
    title: {
      absolute: "title", // 다른곳에서 설정한 title을 무시하고 강제로 사용
      default: `user ${title}`, //title을 명시하지 않을 경우 사용되는 형태
      template: "%s | template", //다른데서 쓰는 title 을 %s에 삽입
    },
    description: `user description id ${params.id}`,
  };
};

export default async function UserPage({ params }: Props) {
  const supabase = createClient();
  const result = await supabase.auth.getUser();
  const user = result.data.user;
  user?.email;

  return (
    <div className={styles.pageWrapper}>
      <div>
        <p>email : ${user?.email}</p>
      </div>
      <div>
        <p>phone Number : ${user?.phone}</p>
      </div>
      <div>
        <p>가입일 : ${user?.created_at}</p>
      </div>
    </div>
  );
}

const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQuery } from "@tanstack/react-query";

export default function useDemoIds() {
  const { data } = useQuery({
    queryKey: ["demoIds"],
    queryFn: async () => {
      const [p] = await db.entities.WorkerProfile.filter({ demo_key: "ramesh" });
      const [r] = await db.entities.Role.filter({ demo_key: "hub_ops" });
      return { workerId: p?.id, roleId: r?.id };
    },
  });
  return data || {};
}
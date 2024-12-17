import { Content } from "src/shared/ui/content";

interface ContentDataProps {
  data: any;
  name: string;
  description: string;
  children: React.ReactNode;
}

export default function ContentData({ children, data, name, description }: ContentDataProps) {
  return (
    <>
      <Content.Space />
      <Content.Box className="col-span-12 md:col-span-6 p-6">
        <h1 className="sm:text-6xl text-4xl font-medium leading-tight">
          {name}
        </h1>
        <p className="mb-3 text-base">
          {description}
        </p>
        {children}
      </Content.Box>
      <Content.Box className="col-span-12 md:col-span-6 p-6 border border-zinc-700">
        <p className="text-lg">{name} Data</p>
        <div className="my-2" />
        <pre className="text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      </Content.Box>
      <Content.Space />
    </>
  )
}
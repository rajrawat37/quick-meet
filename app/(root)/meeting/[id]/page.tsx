//         Part 1                        Part 2
// (Object Destructuring)     (TypeScript Type Annotation)
// "Give me the 'params'    "The object you receive will look
//  property"                like this"
//      ▼                           ▼
// ({params})         : {params: Promise<{ id: string }>}

export default async function Meeting ({params}: {params: Promise<{ id: string }>}){
  const { id } = await params;
  return <h1>Meeting Room: #{id}</h1>;
}

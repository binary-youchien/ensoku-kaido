export default function RoadmapNew(
  {
    ...props
  }: NewProps,
) {


  return (
    <div
      {...props}
      className={"bg-white"}
    >
      <form>
        <input type="text" name={"title"}/>
      </form>
    </div>
  )
}

export interface NewProps {
}

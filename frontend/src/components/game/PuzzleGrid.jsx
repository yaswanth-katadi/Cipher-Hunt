import PuzzleNode from "./PuzzleNode"

function PuzzleGrid({
  nodes = [],
  selectedNodes = [],
  onNodeClick,
  disabled = false,
}) {
  const orderMap =
    new Map(
      selectedNodes.map(
        (node, index) => [
          Number(node),
          index + 1,
        ]
      )
    )

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">

      {nodes.map((node) => (
        <PuzzleNode
          key={node.node}
          node={node}
          selected={selectedNodes.includes(
            Number(node.node)
          )}
          orderNumber={
            orderMap.get(
              Number(node.node)
            ) || null
          }
          onClick={() =>
            onNodeClick(
              Number(node.node)
            )
          }
          disabled={disabled}
        />
      ))}

    </div>
  )
}

export default PuzzleGrid
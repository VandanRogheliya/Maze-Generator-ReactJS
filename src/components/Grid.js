import propTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import UnionFind from './DSU'

const Grid = ({ initialRows, initialCols, isMakingMaze }) => {

  // States
  const [table, setTable] = useState([])
  const [rerender, setRerender] = useState(false)
  const tableHtml = useRef(null)

  // Makes the grid
  useEffect(() => {
    makeTable()

  }, [initialRows, initialCols])

  // Runs Kruskal algorithm
  useEffect(() => {
    if (isMakingMaze) kruskal()
  }, [isMakingMaze])


  const kruskal = () => {
    setRerender(false)

    let edges = []
    let nodes = []

    for (let i = 0; i < initialRows; i++) {
      for (let j = 0; j < initialCols; j++) {
        nodes.push([i, j])
        if (j + 1 < initialCols) edges.push([[i, j], [i, j + 1]]);
        if (i + 1 < initialRows) edges.push([[i, j], [i + 1, j]]);
      }
    }

    let uf = new UnionFind(nodes);

    let set = new Set()

    edges.map(e => set.add(e))

    while (set.size > 0) {
      let edgeIndex = Array.from(set)
      let currentEdge = edgeIndex[Math.floor(Math.random() * edgeIndex.length)]
      set.delete(currentEdge)

      if (uf.connected(currentEdge[0], currentEdge[1])) continue

      uf.union(currentEdge[0], currentEdge[1])

      let i1 = currentEdge[0][0]
      let j1 = currentEdge[0][1]
      let i2 = currentEdge[1][0]
      let j2 = currentEdge[1][1]

      console.log(i1, j1, i2, j2);
      if (i1 === i2) {
        tableHtml.current.children.item(i1).children.item(j1).classList.add("right")
        tableHtml.current.children.item(i2).children.item(j2).classList.add("left")
      } else {
        tableHtml.current.children.item(i1).children.item(j1).classList.add("down")
        tableHtml.current.children.item(i2).children.item(j2).classList.add("top")
      }


    }
    setRerender(true)
  }

  const makeTable = () => {

    let table = []

    for (let i = 0; i < initialRows; i++) {
      let row = []
      for (let j = 0; j < initialCols; j++) {
        row.push(
          (<td key={j} ></td>)
        )
      }

      table.push(
        <tr key={i}>{row}</tr>
      )
    }

    setTable(table);
  }

  return (
    <>
      <h4>{rerender ? "Generated! Click on reset to generate again": "Select Maze size and click on 'Make Maze!' button to generate a maze"}</h4>
      <table>
        <tbody ref={tableHtml}>
          {table.length ? table.map(e => e) : null}
        </tbody>
      </table>
    </>
  )
}

Grid.propTypes = {
  initialRows: propTypes.number,
  initialCols: propTypes.number,
}

Grid.defaultProps = {
  initialCols: 3,
  initialRows: 3
}

export default Grid

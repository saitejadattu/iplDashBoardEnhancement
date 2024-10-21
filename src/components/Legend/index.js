import {Tooltip, PieChart, Pie} from 'recharts'
const Legend = props => {
  const {data0} = props
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data0}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  )
}
export default Legend

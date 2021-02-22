import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDespesas } from '../common/DepesaFuncoes'

export default function GraficoTest({ stateCheckedDespesas, stateCheckedReceitas }) {
  const [despesas, setDespesas] = useState([]);

  async function pegaDespesas() {
    let despesas = await getDespesas(stateCheckedDespesas)
    setDespesas(despesas);
  }

  useEffect(() => {

    pegaDespesas();

  }, [stateCheckedDespesas]);

    return (

      <ResponsiveContainer width="100%" height="100%" >
        <LineChart
          width={100}
          height={100}
          data={despesas}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="descricao" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 8 }} />
       
        </LineChart>
      </ResponsiveContainer>

    );

}

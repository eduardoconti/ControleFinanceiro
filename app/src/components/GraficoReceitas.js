import React, {  useEffect, useState } from 'react';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import { getReceitas } from '../common/ReceitaFuncoes'

export default function GraficoTest({ stateCheckedReceitas, stateTotais }) {
    const [receitas, setReceitas] = useState([]);

    async function pegaReceitas() {

        let receitas = await getReceitas(stateCheckedReceitas)
        setReceitas(receitas);

    }
    useEffect(() => {

        pegaReceitas();

    }, [stateCheckedReceitas, stateTotais]);

    return (

        <ResponsiveContainer width="100%" height="100%">
            <BarChart
    
                data={receitas}
                margin={{
                    top: 15,
                    right: 30,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="descricao" />
                <YAxis domain={[0,3000]}/>
                <Tooltip />
                <Bar dataKey="valor" fill="green" maxBarSize={30}/>
            </BarChart>
        </ResponsiveContainer>

    );

}

import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import { getCategoryTotals } from '../purchase/PurchaseAPIClient';
import { CategoryTotal } from '../models/CategoryTotal';

ChartJS.register(ArcElement, Tooltip, Legend);

class PieChart extends Component {

    state={
        categories:[],
        totals:[],
        colors:[],
        data: [],
        options: []
    };

    async getResponseData(){
        const responseData: CategoryTotal[] = await getCategoryTotals();
        this.setState({responseData:responseData});
        const categories: any[]=[], totals: any[]=[];

        responseData.map((category) => {
            categories.push(category.categoryName);
            totals.push(category.total);
        })
        this.setState({categories:categories, totals:totals});
        

    }

    generateColorCharacter(){
        const characters = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const number:any = (Math.random()*15).toFixed(0);
        return characters[number];
    }

    generateHexColor(){
        let color:String = "";
        for(let count = 0; count<6; count++){
            color = color + this.generateColorCharacter();
        }
        return "#"+color;
    }

    generateBgColors(){
        const colors = [];
        for (let index = 0; index < this.state.categories.length; index++) {
            colors.push(this.generateHexColor());
        }

        //Adding a callback function because of setState delay.
        this.setState({colors:colors}, () => {
            console.log(this.state.colors);
        });
    }

    setUpPieChart(){
        const data = {
            labels: this.state.categories,
            datasets: [{
                label: 'Purchases',
                data: this.state.totals,
                backgroundColor: this.state.colors
            },],
        };

        const options = {
            responsive: true,
            maintainAspectRation: false,
        }

        this.setState({data:data, options:options}, () => {
            console.log(this.state.data);
            console.log(this.state.options);
        });
    }

    async componentDidMount() {
        await this.getResponseData();
        await this.generateBgColors();
        await this.setUpPieChart();
    }

    render(){
        return <Pie data={this.state.data} options={this.state.options} />;
    }
};

export default PieChart;

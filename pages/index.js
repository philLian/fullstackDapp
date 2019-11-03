import React,{Component} from 'react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card } from 'semantic-ui-react';
import {Button } from 'semantic-ui-react';
import {Link} from '../routes';
import Campaign from '../ethereum/campaign';

// export default ()=>{
//   return <h1>hello index!</h1>
// }

class Compaindex extends Component {


  // async ComponentDidMount(){
  //   const compaign = factory.methods.campaignMessages().call();
  //   console.log(compaign);
  // }




  static async getInitialProps(){
    const compaign = await factory.methods.getDeployedCampaign().call();
    // console.log(compaign);
    return {
        compaign,
    };
  }

  renderCampaign(){
    const items = this.props.compaign.map(address=>{
        // console.log(address);
      return{
        header:"项目说明:"+Campaign(address).methods.campaignMessages().call().then(function(Result){
            console.log(Result)
        }),
        meta:"项目地址："+address,
        description: <Link route={`/compaigns/${address}`}><a>查看众筹</a></Link>,
        fluid:true
      }
    });


    return  <Card.Group items={items} />;
  }





  render(){
    return  (
      <Layout>
        <div>
          <h3>众筹列表：</h3>
          <Link route='/compaigns/new'>
          <Button floated='right' content='创建众筹' icon='add' labelPosition='right' primary></Button>
          </Link>
        {this.renderCampaign()}
        </div>
      </Layout>
    );
  }
}

export default Compaindex;

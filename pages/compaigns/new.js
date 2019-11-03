import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form,Input,Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import  {Router}  from '../../routes';


class CompaignNew extends Component{
  state= {

    msg:'',
    minimum:'',
    errorMessage:'',
    loading:'',
  };

  onSubmit = async()=>{
    this.setState({errorMessage:''});
    this.setState({loading:true});
    try {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampain(this.state.msg,this.state.minimum).send({from:accounts[0]});
      Router.pushRoute('/');
    } catch (e) {
      this.setState({errorMessage:e.message});
    }
    this.setState({loading:false});

  }

  render(){
    console.log(this.state.msg,this.state.minimum)
    return (
      <Layout>
          <h3>创建众筹项目</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

              <Form.Field>
                <label>请输入项目说明：</label>
                <Input  label="string" labelPosition="right"
                value ={this.state.msg}
                onChange={event=>this.setState({msg:event.target.value})}
                />
              </Form.Field>
              <Form.Field>
                <label>请输入最小的贡献量！</label>
                <Input  label="wei" labelPosition="right"
                value ={this.state.minimum}
                onChange={event=>this.setState({minimum:event.target.value})}
                />
              </Form.Field>
              <Message error header="错误！" content={this.state.errorMessage} />
              <Button loading={this.state.loading} primary>创建众筹</Button>
          </Form>
      </Layout>
    );
  }
}

export default CompaignNew;

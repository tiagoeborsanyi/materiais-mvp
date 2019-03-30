import React, { Component } from 'react';
import axios from '../../../axios-order';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Cadastro.css';

class Cadastro extends Component {

    state = {
        selectedfile: '',
        imagePreviewURL: '',
        imagem: '',
        fileUpload: null,
        loaded: 0,
        cadastroForm: {
            nome: {
                elementType: 'input',
                label: 'name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome Produto'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            marca: {
                elementType: 'input',
                label: 'brand',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Marca Produto'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            modelo: {
                elementType: 'input',
                label: 'model',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Modelo Produto'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            especificacao: {
                elementType: 'input',
                label: 'specification',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Especificação Produto'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
            codigo: {
                elementType: 'input',
                label: 'codrefproduct',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Código Produto'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
            tipodepacote: {
                elementType: 'input',
                label: 'packingtype',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tipo de Embalagem'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            quantidadepacote: {
                elementType: 'input',
                label: 'qtdpacking',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Quantidade Embalagem'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            descricao: {
                elementType: 'textarea',
                label: 'descrition',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Descrição'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            observação: {
                elementType: 'textarea',
                label: 'observation',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Observação'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formInputValue: null,
        formIsValid: false,
        loading: false
    }

    componentWillReceiveProps() {
        // console.log(this.props);
        const updateFormItem = {
            ...this.state.cadastroForm
        }
        for (let item in updateFormItem) {
            updateFormItem[item].value = '';
        }
        this.setState({
            imagem: '',
            formInputValue: null,
            cadastroForm: updateFormItem
        })
    }

    componentDidMount() {
        // console.log('Cadastro didMount');
        const id = this.props.location.hash.slice(1);
        //console.log(id);
        if (id) {
            axios.get(`/api/item/${id}`).then(res => {
                // console.log(res.data);
                this.setState({
                    imagem: res.data.imagem
                });
                const temp = {
                    name: res.data.name,
                    brand: res.data.brand,
                    model: res.data.model,
                    specification: res.data.specification,
                    codrefproduct: res.data.codrefproduct,
                    packingtype: res.data.packingtype,
                    qtdpacking: res.data.qtdpacking,
                    descrition: res.data.descrition,
                    observation: 'res.data.observation'
                }
                let propTemp  = Object.entries(temp);
                // console.log(propTemp, res.data);
                //propTemp.shift();
                this.setState({formInputValue: propTemp});
            });
        }
    }

    componentDidUpdate() {
        // O erro que esta dando é porque nem sempre os nomes das propriedades vem na ordem correta
        // então acontece uma bagunça na hora que é feito o update e atualizado os inputs
        // para facilitar o objeto de input poderia conter uma propriedade com o valor de inputName
        // para bater com o mesmo valor da propriedade e assim ṕoder atualizar os inputs de uma forma correta
        // console.log('update', this.state.cadastroForm);
        if (this.state.formInputValue) {
            const arr = [];
            for (let key in this.state.cadastroForm) {
                // console.log(this.state.cadastroForm[key]);
                arr.push({
                    id: key,
                    config: this.state.cadastroForm[key]
                });
            }
            arr.map((cadForm, index) => {
                //console.log(index, cadForm.config.label, this.state.formInputValue[index][1]);
                if (this.state.formInputValue[index][1]) {
                    cadForm.config.value = this.state.formInputValue[index][1]
                    cadForm.config.valid = true;
                }
            });
            // Agora a gambi foi arrumada, o estado esta sendo atualizado no update do componente
            // Mas o bom mesmo seria usar redux para poder controlar o estado do componente de uma forma
            // melhor e mais organizado, tendo assim bem mais controle sobre o ciclo de vida do componente
            // e o estado que ele se encontra.
            this.changeStateEdit();
        }
    }

    uploadImagem = (file, name, callback) => {
        const data = new FormData();
        data.append('file', file, name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/api/item/upload', data, config)
            .then(res => {
                return callback(res);
            })
            .catch(err => console.log(err));
    }

    selecionaImagem = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedfile: file,
                imagePreviewURL: reader.result,
                imagem: null
            })
        }
        reader.readAsDataURL(file);
        this.setState({fileUpload: event.target.files[0]});
    }

    middleCadastraItem = (imagem, id) => {
        let tempForm = {};
        // console.log(this.state.cadastroForm);
        for (let key in this.state.cadastroForm) {
            tempForm[key] = this.state.cadastroForm[key].value;
        }
        tempForm.imagem = imagem;
        tempForm._id = id;
        // console.log(tempForm);   
        axios.post('/api/item', tempForm)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({loading: false});
            console.log(err);
        }); 
    }

    cadastraItem = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const {fileUpload} = this.state;
        const id = this.props.location.hash.slice(1);
        // console.log(this.state.image)
        if (fileUpload) {
            this.uploadImagem(fileUpload, fileUpload.name, res => {
                // console.log(res);
                this.middleCadastraItem(res.data.name, id)
            });
        } else {
            this.middleCadastraItem(this.state.imagem, id)
        } 
    }

    checkFormValid(value, regras) {
        let isValid = true;

        if (regras.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangeItem = (event, inputItem) => {
        // console.log(inputItem, event.target.value);
        const updateFormItem = {
            ...this.state.cadastroForm
        }
        const updateFormElement = {
            ...updateFormItem[inputItem]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkFormValid(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateFormItem[inputItem] = updateFormElement;

        let formIsValid = true;
        for (let inputItem in updateFormItem) {
            formIsValid = updateFormItem[inputItem].valid && formIsValid;
        }

        this.setState({cadastroForm: updateFormItem, formIsValid: formIsValid});
    }

    changeStateEdit = () => {
        this.setState({formInputValue: null, formIsValid: true});
    }

    render() {
        const cadastroFormArray = [];
        for (let key in this.state.cadastroForm) {
            cadastroFormArray.push({
                id: key,
                config: this.state.cadastroForm[key]
            });
        }
        let form = (
            <form onSubmit={this.cadastraItem}>
                {cadastroFormArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        label={formElement.config.elementConfig.placeholder}
                        changed={(event) => this.inputChangeItem(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Cadastrar</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        let imagemselecionada = null;
        // console.log(this.state.imagem);
        if (this.state.imagePreviewURL) {
            imagemselecionada = (<img src={this.state.imagePreviewURL} alt="Interruptor de luz" className={classes.image__item} />)
        }else {
            // console.log('else imagem');
            imagemselecionada = (<img src={this.state.imagem ? require(`../../../assests/${this.state.imagem}`) : require('../../../assests/images/no-photo.png')} alt="Interruptor de luz" className={classes.image__item} />)
        }
        return (
            <div className={classes.Container}>
                <h4 className={classes.Titulo}>Cadastro de Items</h4>
            <div className={classes.image}> 
                {imagemselecionada}
                <div className={classes.image__wrapperButton}>
                
                    <button className={classes.image__btn}>Selecione uma imagem</button>
                    <input className={classes.image__inputButton} onChange={this.selecionaImagem} name="" type="file" accept="image/png, image/jpeg" />
                
                </div>
            </div>
            <div className={classes.content}>
                {form}
            </div>
            </div>
        );
    }
}

export default Cadastro;
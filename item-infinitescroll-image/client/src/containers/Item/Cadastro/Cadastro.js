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
        fileUpload: null,
        loaded: 0,
        cadastroForm: {
            nome: {
                elementType: 'input',
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
        formIsValid: false,
        loading: false
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
                imagePreviewURL: reader.result
            })
        }
        reader.readAsDataURL(file);
        this.setState({fileUpload: event.target.files[0]});
    }

    cadastraItem = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const {fileUpload} = this.state;
        // console.log(fileUpload);
        this.uploadImagem(fileUpload, fileUpload.name, res => {
            let tempForm = {};
            for (let key in this.state.cadastroForm) {
                tempForm[key] = this.state.cadastroForm[key].value;
            }
            // console.log(res);
            tempForm.imagem = res.data.name;
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
         });
    }

    checkFormValid(value, regras) {
        let isValid = true;

        if (regras.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangeItem = (event, inputItem) => {
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
        if (this.state.imagePreviewURL) {
            imagemselecionada = (<img src={this.state.imagePreviewURL} alt="Interruptor de luz" className={classes.image__item} />)
        } else {
            imagemselecionada = (<img src={require('../../../assests/images/no-photo.png')} alt="Interruptor de luz" className={classes.image__item} />)
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
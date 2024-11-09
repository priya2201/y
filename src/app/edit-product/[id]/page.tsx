'use client';
import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Checkbox, Chip, Container, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, OutlinedInput, RadioGroup, Select, SelectChangeEvent, TextField, Typography, Radio } from '@mui/material'
import Navigation from '../../pages/Navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
function EditProductForm() {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [details, setDetails] = useState([{ key: '', value: '' }])
    const [colorOptions, setColorOptions] = useState([{ color: '', hex: '' }])
    const [productQuestions, setProductQuestions] = useState([{ question: '', answer: '' }])
    const [categories, setCategories] = useState('')
    const [tags, setTags] = useState('')
    const [productSpeciality, setProductSpeciality] = useState<string[]>([]) //for function chnage
    // const [productSpeciality, setProductSpeciality] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('3')
    const [productAvailable, setProductAvailable] = useState(false)

    const [size, setSize] = useState('S')
    const [launchDate, setLaunchDate] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [productImages, setProductImages] = useState<File[]>([])
    // const router = useRouter() // Initialize the useRouter hook
    // const { id } = router.query // Get the 'id' from the query parameters

    // useEffect(() => {
    //     if (id) {
    //         axios.get(`http://localhost:9090/api/${id}`)
    //             .then(response => {
    //                 const product = response.data;
    //                 setTitle(product.title);
    //                 setDescription(product.description);
    //                 setPrice(product.price);
    //                 // Set other fields as needed
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching product:', error);
    //             });
    //     }
    // }, [id]);


    const specialities = ['Organic', 'Vegan', 'Gluten-Free', 'Non-GMO', 'Handmade', 'Eco-Friendly'];
    const handleSpeciality = (event: ChangeEvent<{ value: unknown }>) => {
        setProductSpeciality(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value as string[])
    }
    const handleQuestionChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let updatedQuestions = [...productQuestions]
        updatedQuestions[index][name] = value
        setProductQuestions(updatedQuestions)
    }
    const handleDetailChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let updatedDetails = [...details]
        updatedDetails[index][name] = value
        setDetails(updatedDetails)
    }
    const handleColorChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedColors = [...colorOptions];
        updatedColors[index][name] = value;
        setColorOptions(updatedColors);
        console.log(updatedColors, 'uc')
    };

    const handleAddDetail = () => {
        setDetails([...details, { key: '', value: '' }])
    }
    const handleAddColorOption = () => {
        setColorOptions([...colorOptions, { color: '', hex: '' }]);
    };
    const handleAddQuestion = () => {
        setProductQuestions([...productQuestions, { question: '', answer: '' }]);
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }

    const handleImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImages(Array.from(e.target.files))
        }
    }
    const handleSizeChange = (e: SelectChangeEvent) => {
        setSize(e.target.value)
    }

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rating', rating);
        formData.append('productAvailable', productAvailable.toString());
        formData.append('size', size);
        formData.append('launchDate', launchDate);
        formData.append('stockQuantity', stockQuantity);

        formData.append('categories', categories.split(',').map(cat => cat.trim()).filter(cat => cat).join(','))
        formData.append('tags', tags.split(',').map(cat => cat.trim()).filter(dat => dat).join(','))
        formData.append('productSpeciality', productSpeciality)
        // formData.append('productSpeciality', productSpeciality.split(',').map(dat => dat.trim()).filter(dat => dat).join(','))
        formData.append('details', JSON.stringify(details));
        formData.append('colorOptions', JSON.stringify(colorOptions));
        formData.append('productQuestions', JSON.stringify(productQuestions));
        if (image) {
            formData.append('image', image)
        }
        productImages.forEach((img) => {
            formData.append('productImages', img)
        })
        console.log([...formData.entries()]); // To check the formData content

        try {
            const response = await axios.put(`http://localhost:9090/api/66ec096d11ef57d4cb985f56`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product updated:', response.data);
        } catch (error) {
            console.error('Failed to updated product:', error);
        }
    }
    return (
        <>
            <div>
                {/* <Navigation /> */}
                <Container component='form' onSubmit={handleSubmit}>
                    <Typography variant='h4' component='h2' color='secondary' gutterBottom>
                        Edit a Product
                    </Typography>
                    <TextField
                        label='Product Title'
                        variant='outlined'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        margin='normal' />

                    <TextField
                        label='Product Description'
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        margin='normal' />
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required

                        margin="normal"
                    />
                    {productQuestions.map((question, index) => (
                        <div key={index}>
                            <TextField
                                label='Question'
                                variant='outlined'
                                name='question'
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, e)}
                                required
                                margin='normal' />
                            <TextField
                                label='Answer'
                                variant='outlined'
                                name='answer'
                                value={question.answer}
                                onChange={(e) => handleQuestionChange(index, e)}
                                required
                                margin='normal' />
                        </div>
                    ))}
                    <Button onClick={handleAddQuestion} variant='outlined' sx={{ my: 2 }}>
                        Add Question
                    </Button>
                    <Typography variant="h5" color='secondary' gutterBottom>Product Speciality</Typography>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Product Speciality</InputLabel>
                        <Select
                            multiple
                            value={productSpeciality}
                            onChange={handleSpeciality}
                            input={<OutlinedInput label="Product Speciality" />}
                            renderValue={(selected) => (
                                <div>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                        >
                            {specialities.map((speciality) => (
                                <MenuItem key={speciality} value={speciality}>
                                    {speciality}
                                </MenuItem>
                            ))}
                        </Select>


                    </FormControl>
                    {details.map((detail, index) => (
                        <div key={index}>
                            <TextField
                                label='Key'
                                variant='outlined'
                                name='key'
                                value={detail.key}
                                onChange={(e) => handleDetailChange(index, e)}
                                required
                                margin='normal'
                            />
                            <TextField
                                name='value'
                                variant='outlined'
                                label='Value'
                                value={detail.value}
                                onChange={(e) => handleDetailChange(index, e)}
                                required
                                margin='normal'
                            />

                        </div>
                    ))}
                    <Button onClick={handleAddDetail} variant="outlined">
                        Add Detail
                    </Button>
                    {colorOptions.map((color, index) => (
                        <div key={index}>
                            <TextField
                                label="Color"
                                variant="outlined"
                                name="color"
                                value={color.color}
                                onChange={(e) => handleColorChange(index, e)}
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Hex Code"
                                variant="outlined"
                                name="hex"
                                value={color.hex}
                                onChange={(e) => handleColorChange(index, e)}
                                required
                                margin="normal"
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddColorOption} variant="outlined">
                        Add Color Option
                    </Button>
                    <FormControl margin='normal' >
                        <FormLabel>Rating</FormLabel>
                        <RadioGroup value={rating}
                            onChange={handleRatingChange}>
                            <FormControlLabel value='1'
                                control={<Radio />} label='1' />
                            <FormControlLabel value='2'
                                control={<Radio />} label='2' />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin='normal' >
                        <InputLabel>Size</InputLabel>
                        <Select value={size} label='Size'
                            onChange={handleSizeChange}>
                            <MenuItem value='S'>S</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="XL">XL</MenuItem>
                            <MenuItem value="XXL">XXL</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Launch Date"
                        type="date"
                        value={launchDate}
                        onChange={(e) => setLaunchDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required

                        margin="normal"
                    />

                    <TextField
                        label="Categories (comma-separated)"
                        variant="outlined"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        helperText="Enter categories separated by commas"
                        margin="normal"
                    />

                    <TextField
                        label="Tags (comma-separated)"
                        variant="outlined"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        helperText="Enter tags separated by commas"
                        margin="normal"
                    />

                    <TextField
                        label="Stock Quantity"
                        variant="outlined"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        required

                        margin="normal"
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={productAvailable}
                                    onChange={(e) => setProductAvailable(e.target.checked)} />
                            }
                            label='Product Avaliable' />
                    </FormGroup>


                    <Button variant="contained" component="label" margin="normal" color="secondary">
                        Upload Product Image
                        <input type="file" hidden onChange={handleImageUpload} accept="image/*" />

                    </Button>
                    <Button variant="contained" component="label" margin="normal" color="secondary">
                        Upload Additional Product Images
                        <input type="file" hidden multiple onChange={handleImagesUpload} accept="images/*" />

                    </Button>
                    <Button variant="contained" color="primary" type="submit" margin="normal">
                        Edit Product
                    </Button>
                </Container>
                <h1>Data edit</h1>
            </div>
        </>
    )
}

export default EditProductForm
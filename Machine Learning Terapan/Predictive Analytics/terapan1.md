# Laporan Proyek Machine Learning - Endricho Abednego

## Domain Proyek

*Pistachio (Pistacia Vera L.)* adalah produk pertanian yang berasal dari Timur Tengah dan Asia Tengah [1]. Ada dua jenis utama pistachio yang biasanya ditanam dan diekspor dari negara asalnya Turki yaitu *Pistachios Kirmizi* dan *Siirt Pistachios*. Setiap jenis pun memiliki harga, selera dan nilai gizi yang berbeda. Maka dari itu diperlukan suatu model *machine learning* yang berguna untuk melakukan klasifikasi gambar antara dua jenis pistachio tersebut yaitu Kirmizi dan Siirt.  

Selain itu, penting juga untuk menentukan kualitas dari pistachio tersebut dengan akurasi yang tinggi dan mudah melalui model machine learning yang akan dibuat. Tujuan utama dari pembuatan model ini adalah untuk mengklasifikasi tipe pistachio menggunakan gambar dalam cara yang cepat dan efektif. 

Terdapat sebuah penelitian yang mengklasifikasikan dua jenis pistachio ini menggunakan 2148 gambar dengan pembagian 1232 gambar merupakan Kirmizi pistachios dan 916 gambar merupakan Siirt pistachios, setiap gambar berukuran sebesar 600 x 600 *pixel* [1]. 


## Business Understanding

Proyek ini dibangun untuk masyarakat dengan karakteristik bisnis sebagai berikut : 
+ Masyarakat Turki yang berprofesi sebagai penjual Pistachio supaya dapat membedakan dari kedua jenis pistachio diatas.
+ Para konsumen pistachio agar memahami perbedaan dari dua jenis pistachio diatas dalam aspek harga, rasa, dan gizi.

### Problem Statements

- Bagaimana membuat model machine learning supaya dapat mengklasifikasi gambar dua jenis pistachio dengan akurasi yang tinggi? 
- Fitur apa saja yang terdapat dalam identifikasi pistachio?
- Apa metode algoritma terbaik untuk melakukan klasifikasi pistachio berdasarkan dataset yang sudah ada? 

### Goals
- Membuat suatu model machine learning dengan mengetahui algoritma yang paling efeketif untuk menyelesaikan masalah klasifikasi pistachio.
- Mengetahui fitur apa saja yang ada dalam identifikasi pistachio
- Melakukan analisis dari dataset yang ada supaya dapat menentukan algoritma mana yang cocok untuk membuat model.

### Solution statements
- Memahami dataset yang akan digunakan untuk membangun proyek ini dengan melakukan visualisasi data. 
- Mencari algoritma atau model yang tepat berdasarkan dataset yang akan digunakan
- Menggunakan 2 jenis model untuk proyek ini supaya dapat menguji langsung model tersebut dan membandingkan mana yang lebih baik dan lebih efisien untuk proyek ini
- Menggunakan metriks evaluasi *Accuracy* sebagai acuan dalam perbandingan 2 model yang digunakan.

## Data Understanding
Dataset yang digunakan merupakan *Pistachio Image Dataset* dengan dua jenis klasifikasi. Dataset ini diambil dari Kaggle yang dapat diunduh melalui tautan berikut [Pistachio Image Dataset](https://www.kaggle.com/datasets/muratkokludataset/pistachio-image-dataset)


### Kelas pada dataset
Terdapat dua kelas pada dataset, yaitu : 
+ Pistachio Kirmizi 
+ Pistachio Siirt

### Detail informasi mengenai dataset : 
+ Dataset memiliki format (.jpg)
+ Dataset berisi 2148 gambar 
+ Dataset dibagi menjadi *Training Set* dan *Validation Set* dengan rasio (80/20)


### Visualisasi Data

Berikut merupakan visualisasi data yang dapat digunakan untuk membantu memahami dataset yang akan digunakan dalam proyek ini
![Contoh data](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/WhatsApp%20Image%202022-12-03%20at%2011.14.25%20PM.jpeg?raw=true)
Gambar 1. Sampel Data

Berdasarkan gambar 1 diatas, dapat terlihat bahwa dari dataset yang akan digunakan memiliki dua jenis pistachio yaitu Kirmizi Pistachio dan Siirt Pistachio.  

## Data Preparation
+ Download Dataset
Sebelum melakukan download dataset, diperlukan mengimport dataset di Kaggle melalui link yang  di atas menggunakan API Kaggle dengan mengunggah file kaggle.json sebagai API key ke dalam notebook. 

+ *Zip Extraction*
Setelah berhasil mengunduh dataset, masih diperlukan lagi extraction file .zip karena file yang diunduh masih dalan bentuk .zip. Setelah di esktraksi baru dataset bisa digunakan.

+ *Split Data*
Dalam proyek ini dataset akan dibagi menjadi *train set* dan *validation set* yang memiliki rasio (80/20). Untuk melakukan split data ini diperlukan import *library splitfolders*, namun sebelum melakukan import diperlukan juga untuk menginstall *library* tersebut

+ *Labeling Data*
Setelah melakukan *split data*, maka hal yang perlu dilakukan selanjutnya adalah *labeling* data. Untuk proyek ini data dibagi menjadi 2 jenis yaitu Kirmizi dan Siirt. *Labeling* dataset diperlukan untuk mengklasifikasikan jenis varian pistachio yang telah didapat melalui dataset. 



## Modeling
1. *Image Augmentation*
Pada proses ini akan dilakukan augmentasi gambar yang memiliki fungsi untuk meningkatkan ukuran kumpulan data gambar secara artifiisial hal ini dapat dicapai dengan menerapkan transformasi aca ke dalam gambar. Proyek ini menggunakan ImageDataGenerator untuk melakukan augmentasi gambar yang berguna untuk menduplikasikan gambar serta menambahkan variasi sesuai dengan fungsi yang telah ditambahkan. Ada beberapa variabel yang digunakan untuk melakukan variasi dalam proyek ini, diantara lain :
   - *rescale*
   Proses ini digunakan untuk menormalisasi setiap nilai piksel pada gambar menjadi nilai antara 0 sampai 1 
    - *horizontal_flip*
    Proses ini berfungsi untuk membalikkan gambar secara horizontal dan pada proyek ini memiliki *value*  *True*
    - *shear_range*
    Gambar akan dimiringkan terhadap sumbu tertentu untuk membuat  atau memperbaiki sudut persepsi, dalam proyek ini diberikan *value* 0.2
    - *zoom_range*
    Sesuai dengan namanya, melakukan augmentasi berupa *zoom* pada gambar sebesar *value* yang telah ditentukan yaitu dalam kasus ini 0.2
    - *rotation_range*
    Melakukan rotasi pada gambar secara acak, dalam proyek ini diberikan *value* 20.
    -  *width_shift_range* dan *height_shift_range*
    Melakukan pergeseran lebar dan tinggi pada gambar, pada kasus ini kedua variabel  diberikan *value* 0.2 baik untuk *height* dan *width*
    - *vertical_flip*
    Proses ini berfungsi untuk membalikkan gambar secara vertical dan pada proyek ini memiliki *value*  *True*
    -  *fill_mode*
    Ketika sebuah pixel bernilai kosong maka piksel terdekat akan dipilih dan diulang untuk mengisi semua nilai pixel kosong tersebut

2. Flow Train Set Data dan Validation Set Data
Proyek ini juga menggunakan fungsi *flow_from_directory()* yang berguna untuk memasukan mengambil data yang telah di augmentasi untuk dimasukan ke dalam memori. Terdapat variabel target_size, batch_size, dan class_mode, beberapa variabel ini berfungsi untuk memberikan batasan pada data baik train maupun validation set.

3. *Model Building*
Proyek ini menggunakan dua jenis algoritma untuk model yang akan dibangun, yang pertama menggunakan base model dan yang kedua menggunakan VGG16. 
  - *Base Model*
Untuk base model, diawali dengan menggunakan Conv2D Maxpooling Layer yang digunakan untuk melakukan permodelan pada proyek *machine learning* dengan basis citra gambar digital. Layer yang digunakan untuk proyek ini merupakan *sequential*, penyusunan layer ini diawali dengan memberikan layer komplek konvolusi dengan fungsi *activation* relu. Kemudian akan dilakukan *MaxPool2D* dengan *pool_size* (2,2) yang akan membagi rata input dari setiap dimensi spasial. Kemudian di akhir *layer*, akan diberikan fungsi Dense layer dengan fungsi *activation softmax* sebagai *layer output*. Setelah *layer* telah terbangun, maka *layer* akan masuk ke proses *compile* menggunakan *optimizer adam* dnegan *loss function categorical_crossentropy. 
Matriks evaluasi yang digunakan untuk base model ini adalah *accuracy*.

- *VGG16 model*
Untuk membangun VGG16 model diperlukan untuk melakukan *import application VGG16*.
Setelah berhasil melakukan *import* maka akan digunakan parameter *weight* yang akan digunakan untuk menentukan pos pemeriksaan bobot dari mana model diinisialisasi. Setelah itu ada *include_top*, secara default pengklasifikasi akan terhubung sesuai dengan 1000 kelas dari *ImageNet* tetapi supaya *layer network* sebelumnya tidak terkoneksi ke dalam model maka nilai akan ditentukan *False*. Terakhir ada *input_shape* yang merupakan tensor gambar yang diumpankan ke jaringan.
Untuk pembangunan *layer* padaa model VGG16 akan diawali dengan *GlobalAveragePooling* untuk mengganti *fully connected layer* untuk klasifikasi di proyek ini. Kemudian di akhir *layer*, akan diberikan fungsi *Dense layer* dengan fungsi *activation softmax* sebagai layer *output*. Kemudian dilakukan proses input layer ke dalam model_vgg16. Setelah layer berhasil dibangun dan dimasukan ke dalam model_vgg16 maka akan masuk ke proses *compile* menggunakan *optimizer adam* dnegan *loss function categorical_crossentropy*.  Metriks yang digunakan untuk model ini adalah *accuracy*.

## Evaluation
Pada proyek ini metrik evaluasi yang digunakan adalah *accuracy*. Sesuai namanya, metrik evaluasi ini dapat menentukan akurasi dari hasil prediksi dengan data yang asli dari *train and validation set*. Skala pengukuran dari metrik ini merupakan antara 0 sampai dengan 1, yang memiliki arti semakin tinggi *accuracy* atau mendekati angka 1 maka hasil prediksi dari model akan semakin baik dan jika semakin rendah *accuracy* atau mendekati angka 0 maka hasil prediksi dari model akan semakun buruk. 


![Akurasi Base Model](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/akurasibase.jpeg?raw=true)
Gambar 2. Grafik Akurasi Base Model

![Plot Loss Base](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/lossbase.jpeg?raw=true)
Gambar 3. Grafik Plot Loss Base Model

Dapat terlihat dari dua gambar diatas bahwa secara garis besar akurasi dari base model yang telah dibuat pada proyek ini mengalami kenaikan dan mendapatkan nilai akurasi tertinggi sebesar  0.9250. Sedangkan untuk plot loss base model mengalami penurunan dan mendapatkan nilai plot loss terendah sebanyak 0.1935.  


![Akurasi VGG16](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/akurasivgg16.jpeg?raw=true)
Gambar 4. Grafik Akurasi Model VGG16

![Plot Loss VGG16](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/lossvgg16.jpeg?raw=true)
Gambar 5. Grafik Akurasi Model VGG16

Untuk metode VGG16, terjadi sedikit peningkatan dalam akurasi yang didapatkan yaitu dengan akurasi tertinggi sebesar 0.93271 sedangkan untuk loss juga mengalami penurunan yaitu di angka 0.1942.

Berdasarkan grafik dan hasil yang didapatkan dari dua algoritma diatas dapat disimpulkan bahwa VGG16 memiliki akurasi yang lebih tinggi dan loss yang lebih rendah. Maka dari itu, untuk dataset yang digunakan pada proyek ini algoritma VGG16 menjadi solusi yang lebih baik dibandingkan dengan base model. 

## Kesimpulan
Berdasarkan hasil *accuracy* yang didapatkan melalui kedua model yang telah dibuat, dapat disimpulkan bahwa dengan menggunakan *Pistachio Image Dataset* model dengan *application* VGG16 merupakan model yang lebih efektif dan solusi yang lebih baik dibandingkan dengan *base* model. 

## Sumber Referensi

[1] SINGH D, TASPINAR YS, KURSUN R, CINAR I, KOKLU M, OZKAN IA, LEE H-N., (2022). Classification and Analysis of Pistachio Species with Pre-Trained Deep Learning Models, Electronics, 11 (7), 981.
# Laporan Proyek Machine Learning - Endricho Abednego

## Project Overview

Menonton film merupakan salah satu hiburan yang sangat disukai oleh banyak orang karena banyaknya pilihan kategori atau *genre* yang tersedia. Mulai dari horor, komedi, *action*, drama hingga dokumenter. Banyak juga film yang tidak hanya berfungsi sebagai hiburan semata, terkadang terdapat film yang memiliki makna tersembunyi seputar hidup atau bahkan ada beberapa film yang dapat menambahkan ilmu kita dari berbagai aspek. Namun, setiap preferensi dan kebiasaan orang menonton film pasti berbeda-beda. Ada beberapa orang yang menjadikan film sebagai hiburan semata tetapi ada juga orang yang menjadikan film sebagai salah satu referensi media pembelajaran. 

Kecenderungan setiap orang yang sudah menemukan film yang cocok bagi mereka maka biasanya akan berputar di kategori yang itu-itu saja. Dari kecenderungan tersebut, dapat dibuat suatu sistem rekomendasi yang dapat merekomendasikan film berdasarkan kebiasaan dan preferensi sebagai saran agar pengguna dapat menemukan film yang sekiranya mereka suka. Sistem rekomendasi ini dugnakan untuk menghemat waktu dalam menentukan film apa yang ingin dilihat karena terkadang mencari film yang cocok membutuhkan waktu yang cukup lama dan hal tersebut dapaat membuang waktu berharga [1]. Sistem ini juga dapat diaplikasikan dan akan sangat menguntungkan untuk aplikasi penyedia layanan *streaming* baik film ataupun serial tv.

## Business Understanding

Proyek ini dibangun untuk masyarakat dengan karakteristik bisnis sebagai berikut : 
+ Masyarakat dengan minat menonton film yang tinggi
+ Pengguna aplikasi penyedia layanan *streaming* film ataupun serial tv.
+ Perusahaan pengembang aplikasi penyedia layanan *streaming* film ataupun serial tv.



### Problem Statements

+  Fitur apa saja yang terdapat pada suatu identifikasi film?
+  Bagaimana cara membangun sistem rekomendasi berbasis film yang akurat dan solutif?
+  Apa saja hal yang perlu dilakukan untuk mempersiapkan data supaya dapat dilatih dengan baik oleh model?

### Goals

+ Mengetahui fitur apa saja yang terdapat pada suatu identifikasi film.
+ Melakukan pembangunan sistem rekomendasi dengan pendekatan *content based filtering* dan *Bag of Words*
+ Melakukan *Data Preparation* sebelum memasukkan data ke dalam model untuk melakukan proses pelatihan

### Solution statements
+ Fitur yang terdapat pada sebuah data dan pada kasus ini film, dapat malkukan perincian komponen atau *column* yang ada dari dataset itu sendiri seperti pada kasus ini, *Movie_id, title, Genres, release_date, Keywords, overview, poster_path, Budget, Revenue, popularity, vote_average, vote_count, Unnamed:0_y. Cast, dan Crew*. Melakukan visualisasi data juga dapat membantu pemahaman data lebih baik lagi. 
+ Untuk membangun sebuah sistem rekomendasi yang dapat menunjukkan beberapa film yang memiliki konsep, kategori, dan cerita yang mirip dengan film yang sudah ditonton sebelumnya dapat menerapkan pendekatan *content based filtering* dan *Bag of Words*. Untuk pendekatan *content based filtering* ini memanfaatkan fitur utama dari sebuah film yang telah ditonton sebelumnya seperi judul, sinopsis, dan popularitas. Sedangkan untuk pendekatan *Bag of Words* yaitu mengubah data teks menjadi vektor, sederhananya metode ini menghitung frekuensi kemunculan kata pada sebuah dataset.
+ Dalam dataset yang digunakan pada proyek ini, terdapat beberapa data yang bernilai null atau NaN. Maka dari itu, perlu dilakukan normalisasi untuk data yang berniali null. 

## Data Understanding
Dataset yang digunakan merupakan *TMDB 10000 Movies Dataset*. Dataset ini diambil dari Kaggle yang dapat diunduh melalui tautan berikut [*TMDB 10000 Movies Dataset*](https://www.kaggle.com/datasets/gazu468/tmdb-10000-movies-dataset)

### Detail infromasi mengenai dataset
+ Memiliki kurang lebih 10.000 data film beserta detail informasi yang lain seperti judul, pemain, *genres*, dan masih banyak lagi.
+ Memiliki data yang bernilai NaN sehingga diperlukan adanya normalisasi data
+ Terdapat dua file yaitu 10000 Credits Data dan 10000 Movies Data 

### Fitur dari Dataset 
10000 Movies Data : 
+ *Movie_id* = Kode unik setiap film
+ *title* =  Judul Film
+ *Genres* = *Genre* atau kategori film
+ *release_date* = Tanggal rilis film
+ *Keywords* = Kata kunci untuk film
+ *overview* = Sinopsis film
+ *poster_path* = *path* untuk poster film
+ *Budget* = Total biaya yang dikeluarkan untuk pembuatan film
+ *Revenue* = Pendapatan dari film
+ *popularity* = Popularitas film
+ *vote_average* = Rata-rata nilai vote yang didapatkan untuk film 
+ *vote_count* = Jumlah vote yang didapatkan untuk film

10000 Credits Data :
+ *Movie_id* = Kode unik setiap film
+ *title* = Judul film
+ *Cast* = Aktor/aktris yang berada dalam film
+ *Crew* = Orang yang bertugas dalam proses produksi film seperti Director, Sutradara, penulis, dan sebagainya.



## Data Preparation
+ Download Dataset
Untuk melakukan download dataset, diperlukan mengimport dataset pada Kaggle melalui link yang ada di atas menggunakan API Kaggle dengan mengunggah file kaggle.json sebagai API key ke dalam notebook
+ *ZIP Extraction*
Setelah dataset berhasil terunduh, masih diperlukan lagi extracion file .zip karena file  yang diundung masih dalam bentuk .zip. Setelah dilakukaan ekstrasi atau *unzip* dataset bisa digunakan.
+ *Merge Dataset*
Dalam dataset ini terdapat dua file, sehingga diperlukan adanya *merge* dataset karena proyek ini membutuhkan kedua file tersebut untuk pembangunan sistem rekomendasi. Proses *merge* dilakukan dengan cara menggunakan fungsi merge()
+ *Normalisasi Dataset*
Dikarenakan dalam dataset ini terdapat beberapa value yang kosong, sehingga diperlukan proses normalisasi dengan cara mengisi data yang bernilai null dan menggantinya dengan string kosong dengan memanggil fungsi fillna()

## Modeling
+ *Content Based Filtering*
Sistem rekomendasi ini akan menggunakan pendekatan *Content Based Learning*
Pada awal akan dilakukan proses import fungsi *TFIdfVectorizer*. Kemudian akan dilakukan inisialisasi fungsi tersebut melalui deklarasi variabel tfVect. Fungsi ini digunakan untuk menemukan fitur penting dari setiap kategori film. Kemudian pada proses inisialisasi fungi *TfIdfVectorizer* akan dimasukkan parameter *stop_words* yang digunakan untuk menghindari kata umum dengan basis bahasa inggris, hal ini juga sebagai salah satu cara untuk melakukan normalisasi data. Setelah itu, perlu dilakukan transformasi model ke dalam bentuk matriks dengan menggunakan fungsi todense(). Kemudian, akan dilakukan perhitungan *similarity degree* dengan menggunakan teknik *cosine similarity*.  Untuk rumus perhitugnan yang digunakan seperti berikut : 
![RumusCosineSimilarity](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/cosine-similarity-1.png?raw=true)
Gambar 1. *Rumus Cosine Similarity*

Rumus tersebut digunakan untuk menghitung kuantitas numerik yang menunjukan kesamaan antara film.

+ *Bag of Words*
Pendekatan ini mengambil dokumen sebagai input dan memecahnya menjadi kata-kata. Kata ini dapat disebut sebagai token dan prosesnya disebut sebagai tokenisasi. 
Token unik yang dikumpulkan dari semua dokumen yang diproses membentuk kosakata yang dipesan. Akhirnya, untuk setiap dokumen, vektor panjang yang sama dengan ukuran kosakata dihasilkan dengan nilai-nilai yang mewakili frekuensi token yang muncul dalam dokumen itu.
## Result
+ Berikut merupakan hasil rekomendasi model *Content Based Filtering* : 
----
	
+ Contoh output model dengan input "Batman Begins"
  |   | title	| 	
  |---|:---|
  |0  |Batman: Bad Blood|
  |1  |	Batman: The Dark Knight Returns, Part 1|
  |2  |	Batman: Mask of the Phantasm|
  |3  |	The Batman|
  |4  |	Batman|
  |5  |	Batman|
  |6  | 	Batman: Year One|
  |7  |	The Lego Batman Movie|
  |8  |	Batman: Hush|
  |9  |	Batman: Gotham by Gaslight|
  |10 |	Batman: Gotham Knight|
  |11 | 	Batman: Mystery of the Batwoman|
  |12 |	Wayne's World|
  |13 |	Batman: Under the Red Hood|
  |14 |	The Dark Knight Rises|
  |15 | 	Batman: The Long Halloween, Part Two|
  Tabel 1. Output model *Content Based Filtering*
Dapat dilihat dari tabel diatas bahwa model dengan pendekatan *Content Based Filtering* telah menampilkan beberapa rekomendasi dari input film berjudul *The Conjuring*. Seluruh film yang ada dalam output tersebut merupakan film yang memiliki sinposis yang mirip dengan input film.

+ Berikut merupakan hasil rekomendasi model *Bag of Words* : 
+ Contoh output model dengan input "Batman Begins"
  | title	| 	
  |---|
  |The Dark Knight|
  |	The Batman|
  |	Batman: Bad Blood|
  |	Batman|
  |	The Raid 2|
  |	Batman: Under the Red Hood|
  | Spider-Man : Homecoming|
  |	Don|
  |	The Dark Knight Rises|
  |	Pain and Glory|
  |	The Heir Apparent: Largo Winch|
  | Sorry If I Call You Love|
  |	Batman: Gotham by Gaslight|
  |	Batman: The Dark Knight Returns, Part 1|
  |	Twelve|
  | 	Sound of Metal|
Tabel 2. Output model *Bag of Words*
Dapat dilihat dari tabel diatas bahwa model dengan pendekatan *Bag of Words* telah menampilkan beberapa rekomendasi dari input film berjudul *The Conjuring*. Seluruh film yang ada dalam output tersebut memiliki perhitungan kata yang mirip dalam tabel 'tags'.
## Evaluation
Metriks evaluasi yang digunakan kedua model algoritma baik *Content Based Filtering* maupun *Bag of Words* adalah *precision*. Untuk proses perhitungan *precision* ini dapat dilakukan secara manual menggunakan rumus sebagai berikut : ![rumusPrecision](https://github.com/endrichoabednego/Dicoding-Academy/blob/main/GambarTerapan1/R.png?raw=true)
Gambar 2. Rumus *Precision*
Untuk model menggunakan pendekatan *Content Based Filtering* memiliki hasil presisi dengan skor yang sempurna yaitu 100% sedangkan untuk pendekatan *Bag of Words* hanya mampu mendapatkan skor presisi 73%. Hal ini menunjukkan bahwa dalam proyek sistem rekomendasi dengan menggunakan dataset ini, pendekatan yang lebih baik merupakan *Content Based Filtering*. Hal ini dapat terjadi karena karakteristik dari sebuah film dapat lebih terlihat jelas pada sinopsis film dan hal itu lah yang dicari kemiripannya dalam *Content Based Filtering*, sedangkan untuk *Bag of Words* dapat memiliki akurasi yang lebih rendah karena untuk pendekatan ini model hanya akan menghitung jumlah token unik pada sebuah dokumen 'tags' kemudian membandingkanya dan mencari kemiripanya dengan film yang ada dalam dataset.


## Kesimpulan
Dari hasil yang didapatkan dari kedua model, dapat disimpulkan bahwa pada proyek sistem rekomendasi dengan menggunakan dataset [*TMDB 10000 Movies Dataset*](https://www.kaggle.com/datasets/gazu468/tmdb-10000-movies-dataset) akan mendapatkan hasil rekomendasi yang lebih baik apabila menggunakan pendekatan *Content Based Filtering*

## Sumber Referensi

[1] S. Agrawal and P. Jain, "An improved approach for movie recommendation system," 2017 International Conference on I-SMAC (IoT in Social, Mobile, Analytics and Cloud) (I-SMAC), 2017, pp. 336-342, doi: 10.1109/I-SMAC.2017.8058367.

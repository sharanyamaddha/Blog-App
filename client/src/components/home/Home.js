import "./Home.css";

function Home() {
  return (
    <div className='articleHome'>
      <h1 style={{color:'black'}}>Digital Talks</h1>
      {/* <h1 style={{color:'black'}}>My Writings</h1> */}
      <img src={"https://t3.ftcdn.net/jpg/02/34/00/04/360_F_234000479_tIWNz8JP4oCoMaS1JGlLnwmhjyUxGDB0.jpg"} alt="" className="artcleImage" />

      {/* <img src={"https://dustinstout.com/wp-content/uploads/2015/06/how-to-write-a-blog-1920x1080.jpg"} alt="" className="artcleImage" /> */}
      <p className="lead">
      {/* <span className="fs-8px"><b>Welcome to our blog!</b></span>  your go-to destination for insightful articles, expert tips, and the latest trends across a variety of topics. Whether you're here to dive into the world of tech innovations, explore lifestyle hacks, or gain insights into personal development, we have something for everyone. Our team of passionate writers is dedicated to providing high-quality content that informs, inspires, and entertains. We invite you to explore, engage, and share your thoughts as we embark on this journey of discovery together. Stay tuned for regular updates and join our community to stay ahead of the curve! */}
      <span className="fs-8px"><b>Welcome to our blog!</b></span>Welcome to your premier source for engaging articles, professional advice, and the latest trends spanning a wide range of subjects. Whether you're eager to explore the newest advancements in technology, uncover practical lifestyle tips, or delve into personal growth strategies, we've got you covered. Our dedicated team of enthusiastic writers is committed to delivering top-notch content that educates, motivates, and captivates. We encourage you to explore, interact, and share your perspectives as we navigate this path of exploration together. Stay connected for frequent updates and become part of our community to remain at the forefront of what's new and exciting!
      </p>
      <p className="lead">
      Discover a world of knowledge and inspiration on our blog, where we bring you carefully curated content that caters to diverse interests. From in-depth analyses of current events to practical advice on everyday challenges, our articles are designed to enrich your understanding and spark your curiosity. We believe in the power of storytelling and aim to create a space where ideas flourish and discussions thrive. Join our community of avid readers and thinkers, and let’s explore new perspectives and innovative solutions together. Whether you’re here for professional growth or personal enrichment, you’ll find a wealth of resources to guide you on your journey.
      </p>
    </div>
  );
}

export default Home;
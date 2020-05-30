const cheerio = require('cheerio');
const axios = require("axios");
const config = require('./config.json');

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}



const scrapeForTest = async function(major, number, message) {
  const $ = await fetchHTML(config.url);

  let testWeAreLookingFor;
  if(major == 1) {
    testWeAreLookingFor = 'E_c_matematica_M_mate-info_2020_Test_' + number;
  } else {
    testWeAreLookingFor = 'E_c_matematica_M_st-nat_2020_Test_' + number;
  }

  $('li a').each(function(i, elem) {
    // if($(this).attr('title').startsWith('E_c_matematica'))
    //   urls[i] =$(this).attr('href');

    let title = $(this).attr('title');
    if(title == testWeAreLookingFor) {
      message.channel.send($(this).attr('href'));
      return $(this).attr("href");
    }
    return -1;
  });
}

module.exports = {
  scrapeForTest
}

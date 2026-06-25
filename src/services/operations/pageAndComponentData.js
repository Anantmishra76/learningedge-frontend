import React from 'react'
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';


// ================ get Catalog Page Data  ================
/**
 * Fetches data for the catalog page.
 * @param {string} categoryId - ID of the category
 * @returns {Array} Catalog page data
 */
export const getCatalogPageData = async (categoryId) => {
  let result = [];
  try {
    const response = await apiConnector(
      "POST", 
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId },
      { "Content-Type": "application/json" }
    );

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    console.log("CATALOG PAGE DATA API RESPONSE............", response)
    result = response?.data?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    result = error.response?.data.data;
  }
  return result;
}


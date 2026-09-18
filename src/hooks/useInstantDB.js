import { defaultData } from '../data/defaultData';
import { useState, useEffect } from 'react';
import { useQuery, useTransaction } from '../providers/InstantProvider';

const STORAGE_KEY = 'solar_enterprises_site_data_v2';

export const useInstantDB = () => {
  // Query for ALL siteData records
  const { data, isLoading, error } = useQuery({
    siteData: {}
  });

  const tx = useTransaction();

  // Debug: Log what we're getting from Instantd
  useEffect(() => {
    console.log('🔍 Instantd Query Result:', {
      data,
      isLoading,
      error,
      siteDataCount: data?.siteData?.length || 0,
      rawSiteData: data?.siteData,
      hasData: !!data,
      dataKeys: data ? Object.keys(data) : []
    });
    
    if (error) {
      console.error('❌ Instantd Query Error:', error);
    }
  }, [data, isLoading, error]);

  // Get the main data record
  const siteDataRecords = data?.siteData || [];
  const mainRecord = siteDataRecords.find(item => item.recordId === 'main') || siteDataRecords[0];

  // State to hold current data
  const [currentData, setCurrentData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.contact?.phone?.includes('7889285239') || parsed?.contact?.address?.includes('Agra')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing localStorage:', e);
    }
    return defaultData;
  });

  // Update when Instantd data changes (real-time sync)
  useEffect(() => {
    if (mainRecord?.data) {
      try {
        const parsed = JSON.parse(mainRecord.data);
        const currentString = JSON.stringify(currentData);
        const parsedString = JSON.stringify(parsed);
        
        // Only update if data actually changed
        if (currentString !== parsedString) {
          setCurrentData(parsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch (e) {
        console.error('❌ Error parsing Instantd data:', e);
      }
    } else if (siteDataRecords.length === 0 && !isLoading) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.contact?.phone?.includes('7889285239') || parsed?.contact?.address?.includes('Agra')) {
            setCurrentData(parsed);
          }
        } catch (e) {
          console.error('❌ Error parsing localStorage:', e);
        }
      }
    }
  }, [data, mainRecord, siteDataRecords.length, isLoading, currentData]);

  const updateData = async (newData) => {
    const dataString = JSON.stringify(newData);
    
    // Update local state immediately
    setCurrentData(newData);
    localStorage.setItem(STORAGE_KEY, dataString);
    
    // Save to Instantd
    try {
      console.log('💾 Starting save to Instantd...');
      console.log('💾 Current mainRecord:', mainRecord);
      console.log('💾 Transaction object:', tx);
      
      if (mainRecord?.id) {
        // Update existing
        console.log('🔄 Updating existing record:', mainRecord.id);
        const updateData = {
          siteData: {
            id: mainRecord.id,
            recordId: 'main',
            data: dataString
          }
        };
        console.log('🔄 Update payload:', updateData);
        tx.update(updateData);
        console.log('✅ Update transaction sent to Instantd');
        console.log('📤 Data sent:', { id: mainRecord.id, recordId: 'main', dataSize: dataString.length });
      } else {
        // Create new
        console.log('🆕 Creating new record (no existing record found)');
        const insertData = {
          siteData: {
            recordId: 'main',
            data: dataString
          }
        };
        console.log('🆕 Insert payload:', insertData);
        tx.insert(insertData);
        console.log('✅ Insert transaction sent to Instantd');
        console.log('📤 Data sent:', { recordId: 'main', dataSize: dataString.length });
        console.log('💡 Waiting for Instantd to process...');
      }
      
      // Wait for transaction to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After saving, check if data appears in query
      console.log('🔍 Checking if data was saved...');
      console.log('🔍 Current query data:', {
        siteDataCount: data?.siteData?.length || 0,
        hasMainRecord: !!mainRecord,
        mainRecordId: mainRecord?.id,
        mainRecordRecordId: mainRecord?.recordId
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Error in updateData:', error);
      console.error('💡 The siteData schema might not exist!');
      console.error('💡 Create it in Instantd dashboard: https://instantdb.com/dashboard');
      console.error('💡 See CREATE_SCHEMA.md for step-by-step instructions');
      return Promise.reject(error);
    }
  };

  const resetData = () => {
    updateData(defaultData);
  };

  const refreshData = () => {
    // Data auto-updates via useQuery, but we can force a refresh
    if (mainRecord?.data) {
      try {
        const parsed = JSON.parse(mainRecord.data);
        setCurrentData(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {
        console.error('Error refreshing:', e);
      }
    }
  };

  return {
    data: currentData,
    updateData,
    resetData,
    refreshData,
    isLoading,
    isSaving: false,
    error
  };
};

// Helper function to convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Neden Custom Hook (useScanner) yazdık?
 * Tarayıcının yerleşik BarcodeDetector API'ını soyutlayarak, kamera erişimi ve 
 * QR kod okuma mantığını herhangi bir bileşende kolayca tekrar kullanmamızı sağlar.
 */
export function useScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref'ler re-render tetiklemeden değerleri saklamamızı sağlar (Loop önleme)
  const isScanningRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  const stopScan = useCallback(() => {
    isScanningRef.current = false;
    setIsScanning(false);
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startScan = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!('BarcodeDetector' in window)) {
      setError('Tarayıcınız BarcodeDetector API\'ını desteklemiyor. Lütfen Chrome veya Edge kullanın.');
      return;
    }

    if (isScanningRef.current) return; // Zaten çalışıyorsa tekrar başlatma

    try {
      setError(null);
      setScannedResult(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      
      streamRef.current = stream;
      videoElement.srcObject = stream;
      await videoElement.play();

      // @ts-ignore - BarcodeDetector is a new API
      const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
      
      isScanningRef.current = true;
      setIsScanning(true);

      const scan = async () => {
        if (!isScanningRef.current) return;
        
        try {
          // Video karesinden QR kodu algıla
          const barcodes = await barcodeDetector.detect(videoElement);
          if (barcodes.length > 0) {
            setScannedResult(barcodes[0].rawValue);
            stopScan(); // Başarılı tarama sonrası durdur
          } else {
            frameRef.current = requestAnimationFrame(scan);
          }
        } catch (e) {
          console.error('Scan error:', e);
          frameRef.current = requestAnimationFrame(scan);
        }
      };

      frameRef.current = requestAnimationFrame(scan);
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Kameraya erişilemedi. Lütfen izinleri kontrol edin.');
      setIsScanning(false);
      isScanningRef.current = false;
    }
  }, [stopScan]);

  // Bileşen unmount olduğunda kamerayı kapat (Bellek yönetimi)
  useEffect(() => {
    return () => stopScan();
  }, [stopScan]);

  return { isScanning, scannedResult, error, startScan, stopScan, setScannedResult };
}

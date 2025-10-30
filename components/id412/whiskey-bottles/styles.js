import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  width: 95%;
  max-width: 1800px;
  height: calc(100vh - 200px);
  margin-bottom: 1rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
  }
`;

export const Section = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const SectionLabel = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.4rem 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 10;
  pointer-events: auto;
  opacity: 0.95;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateX(-50%) scale(1.05);
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #6B3410;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: #A67C52;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  canvas {
    display: block;
  }
`;

// Modal styles with fade-in and slide-up animations
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  
  /* Fade in animation */
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Slide up and fade in animation */
  animation: slideUp 0.4s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 968px) {
    max-height: 95vh;
    margin: 1rem;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  line-height: 1;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  height: 600px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px auto;
    height: auto;
  }
`;

export const ModalLeft = styled.div`
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 968px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const ModalBottleContainer = styled.div`
  width: 100%;
  height: 100%;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  canvas {
    display: block;
  }
`;

export const ModalRight = styled.div`
  padding: 3rem;
  overflow-y: auto;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 968px) {
    padding: 2rem;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  color: #E5D4B5;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(229, 212, 181, 0.3);
  padding-bottom: 1rem;
  
  @media (max-width: 968px) {
    font-size: 2rem;
  }
`;

export const InfoSection = styled.div`
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.5s ease-out backwards;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Stagger the animations */
  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.15s; }
  &:nth-child(4) { animation-delay: 0.2s; }
  &:nth-child(5) { animation-delay: 0.25s; }
  &:nth-child(6) { animation-delay: 0.3s; }
  &:nth-child(7) { animation-delay: 0.35s; }
`;

export const InfoLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #A67C52;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
`;

export const InfoValue = styled.div`
  font-size: 1rem;
  color: #E5D4B5;
  line-height: 1.6;
  font-weight: 300;
  
  @media (max-width: 968px) {
    font-size: 0.9rem;
  }
`;

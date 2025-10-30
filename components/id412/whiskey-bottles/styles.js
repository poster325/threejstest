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
  pointer-events: none;
  opacity: 0.95;
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


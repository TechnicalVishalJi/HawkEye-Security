<div align="center">
  <h1>HawkEye</h1>
  <p>Reasoned Surveillance. The world's first AI-powered indoor physical-security architect.</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  </p>
</div>

---

## Executive Summary

Physical security is a **$120B+ global market**, with video surveillance comprising over 50% of the industry. Despite advanced camera hardware, the most critical failure point remains **human error in spatial placement**. 

Cameras act as deterrents only when placed correctly. However, post-incident analysis consistently reveals blind spots, cameras pointed at the sky, poor lighting considerations, and occlusions caused by standard architectural features. Professional consultation is statically designed and prohibitively expensive—averaging **$1,500 for small businesses** and scaling to **$50,000+ for enterprise campuses**. Furthermore, these designs are completely static; they fail to adapt when environments physically change.

**HawkEye** completely revolutionizes this process. By combining real-time 3D spatial reconstruction with advanced semantic reasoning, HawkEye acts as an autonomous security architect. It ingests a simple video scan of a space, generates a live digital twin, and reasons about coverage, sunlight, and adversarial threat models to dynamically optimize sensor placement.

---

## The Core Innovation

### Solving the Spatial Reasoning Deficit

Current Large Language Models (LLMs) cannot natively perform **3D Field-of-View (FOV) coverage** or **adversarial visibility reasoning**. Prompting an LLM to "place 4 cameras to cover 95% of the floor area and monitor all doors" results in hallucinated coordinates without occlusion modeling or raycasting.

**Our Patent-Pending Solution:** We externalize the geometric substrate. HawkEye separates mathematical spatial tasks from semantic reasoning. 
1. **Geometric Substrate:** We utilize streaming pointclouds, complex 3D raycasting, and A* pathfinding.
2. **Semantic Reasoning:** The K2 model operates on top of this mathematical foundation, reasoning semantically ("the vault is higher priority than the hallway," "this blind spot is exploitable by an insider threat"). 

HawkEye turns the K2 model into the "reasoning glue" between absolute spatial geometry and adversarial outcome prediction.

---

## Technical Pipeline

HawkEye transforms raw visual input into an enterprise-grade security schematic through a four-stage autonomous pipeline:

1. **Video to 3D Point Cloud**
   - Utilizing Structure-from-Motion (SfM) and depth estimation, HawkEye reconstructs a dense 3D model of the space from a standard smartphone walkthrough video. **No LiDAR or specialized hardware is required.**
2. **Spatial Understanding & Segmentation**
   - A segmentation model identifies walls, doors, windows, ceilings, entry points, and obstructions. The system intelligently classifies spatial topologies, distinguishing corridors from vulnerable access points.
3. **Semantic Reasoning (K2)**
   - The K2 Think V2 core ingests the spatial data and computes optimal placements. It evaluates FOV calculations, overlapping coverage zones, entry-point prioritization, and sight-line obstruction analysis, all while mathematically minimizing hardware costs.
4. **Adversarial Simulation & View Rendering**
   - For every recommended position, HawkEye renders the simulated view *from* the camera. Users can see through the eyes of their security system before hardware installation.

---

## System Capabilities

### Dynamic Environmental Simulation
- **Lighting & Solar Simulation:** Using window normals and geographical data, K2 simulates the sun's arc across a 24-hour cycle. It predicts glare blindness, shadow blind spots, and dusk vulnerabilities, recommending HDR schedules or IR-capable camera swaps where necessary.
- **"What-If" Geometry Edits:** If a wall is moved or a doorway is added, the digital twin re-runs raycasting and the K2 engine dynamically re-optimizes the entire security layout.

### Adversarial Threat Modeling
HawkEye runs A* algorithmic simulations against the generated security layout using three distinct threat profiles:
1. **The Burglar:** Opportunistic, lacks interior knowledge, avoids sensor-dense zones.
2. **The Insider:** Intimately knows the layout and sensor positions; seeks to disable specific nodes before exfiltration.
3. **The Professional:** Equipped with specialized tools, highly systematic, operates on an extended time budget.

### Intelligent Dashboard & Telemetry
- **Coverage Analysis:** Real-time percentage readouts of geometric floor coverage and entry-point observation.
- **Budget Optimization:** A dynamic logarithmic slider ($500 to $50k) that spawns or prunes cameras in real-time, streaming the exact security trade-offs of the budget adjustment.
- **Privacy Compliance:** Auto-detection and semantic masking of privacy-mandated zones (e.g., bathrooms, private offices) to ensure FOV cones do not violate compliance standards.

---

## Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Input Ingestion** | ScanNet (Primary), Live Smartphone Capture |
| **3D Reconstruction** | StreamVGGT (Streaming single-camera model) |
| **Geometry & Optimization** | 3D Raycasting on Pointclouds, A* Adversarial Pathfinding |
| **Reasoning Core** | K2 Think V2 (Semantic placement prompts & adversarial iteration loop) |
| **Motion Detection** | YOLOv8/YOLOv10 person detection projected to 3D overlays |
| **Visualization & UI** | React, Next.js, TailwindCSS, Three.js + Custom Particle/Volumetric Shaders |

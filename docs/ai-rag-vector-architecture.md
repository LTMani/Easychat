# EasyChat CRM — RAG Vector Search & Embeddings Architecture

## 1. Vector Search Pipeline Overview

EasyChat integrates Retrieval-Augmented Generation (RAG) to provide contextual grounding for customer support agents and AI Copilot automated responses.

### 1.1 Ingestion & Chunking
1. **Document Ingestion**: Knowledge Base Markdown articles, API specs, and resolved support tickets.
2. **Recursive Splitting**: Content divided into chunks of ~300 characters with 50-character semantic overlaps.
3. **Embedding Generation**: 1536-dimensional dense vectors generated via `text-embedding-3-small`.

---

## 2. Hybrid Retrieval: Keyword + Semantic Vector (RRF)

Dense vector search is paired with BM25/keyword inverted indexes via **Reciprocal Rank Fusion (RRF)**:

$$\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$

Where:
- $k = 60$ (Smoothing constant)
- $r_m(d)$ is the rank of document $d$ in system $m$ (Keyword or Dense Vector)

### 2.1 Cosine Similarity Computation
Dense matching computes cosine distance over normalized embeddings:

$$\text{CosineSimilarity}(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$$

---

## 3. Grounding & Hallucination Mitigation

Top-5 retrieved chunks are formatted into the LLM system prompt context window:
- Bounded knowledge boundary preventing hallucinated company policies.
- Source attribution links provided in agent UI for 1-click verification.

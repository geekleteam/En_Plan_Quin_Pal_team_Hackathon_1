FROM python:3.10.14-bookworm

COPY requirements-llama-cpu.txt ./

RUN pip install -r requirements-llama-cpu.txt

RUN apt-get update &&  \
    apt-get install --no-install-recommends -y python3-pip python3-dev ffmpeg libsm6 libxext6 gcc g++ musl-dev && \
    rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

RUN pip install huggingface_hub

COPY . ./

EXPOSE 5000

ENTRYPOINT ["python", "run.py"]